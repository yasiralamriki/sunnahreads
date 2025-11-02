import type { CollectionConfig } from 'payload';

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'biography',
      type: 'textarea',
      required: false,
    },
    {
      name: 'deathDate',
      type: 'number',
      required: false,
    }
  ]
};
