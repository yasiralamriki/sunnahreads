import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
    },
  ],
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true;
      return user?.id === id;
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
};
