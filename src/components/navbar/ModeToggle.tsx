'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Select>
        <SelectTrigger className='w-[130px]'>
          <Monitor className='h-[1.2rem] w-[1.2rem]' />
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className='w-[130px]'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>
          <Sun className='mr-2 h-4 w-4 inline' />
          Light
        </SelectItem>
        <SelectItem value='dark'>
          <Moon className='mr-2 h-4 w-4 inline' />
          Dark
        </SelectItem>
        <SelectItem value='system'>
          <Monitor className='mr-2 h-4 w-4 inline' />
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
