import { getPayload } from 'payload';
import config from '@payload-config';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';

export default async function Home() {
  const payload = await getPayload({ config });

  const books = await payload.find({
    collection: 'books'
  });

  const authors = await payload.find({
    collection: 'authors'
  });

  return (
    <div className='flex flex-col min-h-screen min-w-screen items-center px-8 lg:px-48'>
      <HeroSection totalBooks={books.totalDocs} totalAuthors={authors.totalDocs} />
      <SearchBar books={books.docs} authors={authors.docs} />
    </div>
  );
}
