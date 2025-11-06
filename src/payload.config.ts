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

// Use regular postgres adapter for Supabase connection
const databaseAdapter = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI || '',
  },
  prodMigrations: migrations,
  migrationDir: path.resolve(dirname, '../migrations'),
  push: process.env.NODE_ENV !== 'production',
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
