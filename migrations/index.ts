import * as migration_20251106_100515 from './20251106_100515';

export const migrations = [
  {
    up: migration_20251106_100515.up,
    down: migration_20251106_100515.down,
    name: '20251106_100515'
  },
];
