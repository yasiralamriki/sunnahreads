import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Books } from './collections/Books';
import { Authors } from './collections/Authors';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Use Vercel Postgres adapter in production (Vercel), regular adapter locally
const isVercel = process.env.VERCEL === '1';
const databaseAdapter = isVercel
  ? vercelPostgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || '',
      },
    })
  : postgresAdapter({
      pool: {
        connectionString: process.env.DATABASE_URI || '',
      },
      migrationDir: path.resolve(dirname, 'migrations'),
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
  collections: [Users, Media, Books, Authors],
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
