import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Books } from './collections/Books';
import { Authors } from './collections/Authors';
import { Tags } from './collections/Tags';
import { migrations } from '../migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Determine if we should run migrations
// On Vercel: only run on production branch (VERCEL_ENV === 'production')
// Locally: only run if NODE_ENV === 'production'
const isProduction = process.env.VERCEL_ENV 
  ? process.env.VERCEL_ENV === 'production'  // On Vercel, check VERCEL_ENV
  : process.env.NODE_ENV === 'production';   // Locally, check NODE_ENV

// Use regular postgres adapter for Supabase connection
const databaseAdapter = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI || '',
  },
  // Only run migrations on Vercel production (not preview/dev branches)
  // VERCEL_ENV is 'production' only for production deployments
  // VERCEL_ENV is 'preview' for branch deployments like dev
  ...(process.env.VERCEL_ENV === 'production' && {
    prodMigrations: migrations,
    migrationDir: path.resolve(dirname, '../migrations'),
  }),
  // Use push (auto-sync) for development
  push: !isProduction,
});

// Build config
export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Books, Authors, Tags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: databaseAdapter,
  sharp,
  plugins: [
    s3Storage({
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        forcePathStyle: true,
      },
      bucket: process.env.SUPABASE_BUCKET ?? 'media',
      collections: {
        media: true,
      },
    }),
  ]
});
