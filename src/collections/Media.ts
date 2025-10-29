import type { CollectionConfig } from 'payload';      
import { Md5 } from 'ts-md5';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true;
      return user?.id === id;
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.filename) {
          // Extract the file extension
          const ext = data.filename.substring(data.filename.lastIndexOf('.'));
          // Hash the filename and append the extension
          const hashedName = Md5.hashStr(data.filename).toString();
          data.filename = `${hashedName}${ext}`;
        }
        return data;
      },
    ],
  }
};
