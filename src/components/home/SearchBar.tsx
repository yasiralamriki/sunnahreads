'use client';

import { useMemo, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Icon, Book as BookIcon } from 'lucide-react';
import { featherText } from '@lucide/lab';
import type { Book, Author } from '@/payload-types';

export default function SearchBar({ books, authors }: { books: Book[], authors: Author[] }) {
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function shuffle<T>(array: T[]): T[] {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const combinedContent = useMemo(() => {
    const list = [...books, ...authors];
    // When there is no query, show a randomized list mixing books and authors
    if (!searchQuery) return shuffle(list);

    const filtered = list.filter((item) => {
      if ('title' in item) {
        return item.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return shuffle(filtered);
  }, [books, authors, searchQuery]);

  function handleSetSearchQuery(value: string) {
    setSearchQuery(value);
  }

  return (
    <div className='pt-8 w-full'>
      <Command 
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`rounded-lg border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-xl max-w-full [&_svg[class*="opacity-50"]]:!text-amber-300 [&_svg[class*="opacity-50"]]:!w-6 [&_svg[class*="opacity-50"]]:!h-6 [&_svg[class*="opacity-50"]]:!opacity-100 [&_[data-slot="command-input-wrapper"]]:!h-auto [&_[data-slot="command-input-wrapper"]]:py-4 ${isOpen ? '[&_[data-slot="command-input-wrapper"]]:border-b [&_[data-slot="command-input-wrapper"]]:border-amber-400/30' : '[&_[data-slot="command-input-wrapper"]]:border-b-0'}`}
      >
        <CommandInput
          placeholder='Search for books, authors...'
          className='placeholder:text-amber-400 text-amber-100 !h-auto !text-xl'
          value={searchQuery}
          onValueChange={(value: string) => {
            handleSetSearchQuery(value);
          }}
        />
        <CommandList hidden={!isOpen} className='scrollbar-thumb-amber-500/60 scrollbar-track-amber-900/40 scrollbar-thin'>
          <CommandEmpty className='text-amber-300 text-center py-4'>No results found.</CommandEmpty>
          <CommandGroup heading='Search Results' className='[&_[cmdk-group-heading]]:!text-amber-300'>
            {combinedContent.map((item) => (
              <CommandItem key={item.id} className='!bg-transparent hover:!bg-gradient-to-r hover:!from-amber-900/40 hover:!to-amber-900/40 active:!bg-amber-800/50 cursor-pointer'>
                {'title' in item ? (
                  <a href={`/book/${item.id}`} className='flex items-center gap-2'>
                    <BookIcon className='h-4 w-4 text-amber-400' />
                    <span>{item.title}</span>
                  </a>
                ) : (
                  <a href={`/author/${item.id}`} className='flex items-center gap-2'>
                    <Icon iconNode={featherText} className='h-4 w-4 text-amber-400' />
                    <span>{item.name}</span>
                  </a>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}