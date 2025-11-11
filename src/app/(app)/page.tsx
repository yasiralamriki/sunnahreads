import { getPayload } from 'payload';
import config from '@payload-config';
import HeroSection from '@/components/home/HeroSection';
import SearchBar from '@/components/home/SearchBar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCopy, Icon } from 'lucide-react';
import { featherText } from '@lucide/lab';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config });

  const books = await payload.find({
    collection: 'books'
  });

  const authors = await payload.find({
    collection: 'authors'
  });

  const readers = await payload.count({
    collection: 'users'
  });

  return (
    <div className='flex flex-col min-h-screen min-w-screen items-center px-8 lg:px-48 gap-16'>
      <div className='flex flex-col gap-8 w-full'>
        <HeroSection totalBooks={books.totalDocs} totalAuthors={authors.totalDocs} totalReaders={readers.totalDocs} />
        <SearchBar books={books.docs} authors={authors.docs} />
      </div>
      <Card className='flex w-full mb-32 rounded-lg border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-xl max-w-full gap-2'>
        <CardHeader className='text-center min-[500px]:text-left'>
          <CardTitle className='text-xl'>Books</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mostrecent" className='flex flex-col gap-6 w-full items-center min-[500px]:items-baseline'>
            <TabsList className='flex flex-col min-[450px]:flex-row bg-amber-900/40 border border-amber-400/30 w-fit h-fit'>
              <TabsTrigger value="mostrecent" className="cursor-pointer data-[state=active]:!bg-amber-900/40 data-[state=active]:border-amber-400/30 data-[state=active]:!text-amber-500 !text-white">Most Recent</TabsTrigger>
              <TabsTrigger value="mostviewed" className="cursor-pointer data-[state=active]:!bg-amber-900/40 data-[state=active]:border-amber-400/30 data-[state=active]:!text-amber-500 !text-white">Most Viewed</TabsTrigger>
              <TabsTrigger value="mostfavorited" className="cursor-pointer data-[state=active]:!bg-amber-900/40 data-[state=active]:border-amber-400/30 data-[state=active]:!text-amber-500 !text-white">Most Favorited</TabsTrigger>
            </TabsList>
            <TabsContent value="mostrecent" className='grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-0'>
              {books.docs.slice(0, 5).map((book) => (
                <a key={book.id} href={`/book/${book.id}`} className='cursor-pointer no-underline'>
                  <Card className='border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-lg hover:scale-[1.02] transition-transform h-full justify-between'>
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img 
                        src={book.image && typeof book.image === 'object' && 'url' in book.image && book.image.url ? book.image.url : '/placeholder.jpg'}
                        alt={book.image && typeof book.image === 'object' && 'alt' in book.image && book.image.alt ? book.image.alt : 'Book Cover'}
                        className='object-contain h-[250px] rounded-lg mx-auto'
                      />
                    </CardContent>
                    <CardFooter className='flex flex-col gap-2 items-start'>
                      <div className='flex items-center gap-2'>
                        <Icon iconNode={featherText} className='h-4 w-4 text-amber-400' />
                        <Link 
                          href={`/author/${typeof book.author === 'object' && book.author !== null && 'id' in book.author ? book.author.id : '#'}`}
                          className='hover:text-amber-300 hover:underline'
                          suppressHydrationWarning
                        >
                            {typeof book.author === 'object' && book.author !== null
                              ? `${book.author.displayName}`
                              : 'Author information not available'}
                        </Link>
                      </div>
                      <div className='flex items-center gap-2'>
                        <BookCopy className='h-4 w-4 text-amber-400' />
                        <p>
                          {book.volumes ? `${book.volumes} Volume${book.volumes > 1 ? 's' : ''}` : 'Unknown Volumes'}
                        </p>
                      </div>
                      {book.tags && book.tags.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {book.tags.map((tag) => (
                            <Badge
                              key={typeof tag === 'object' && tag !== null && 'id' in tag ? tag.id : tag}
                              variant='default'
                              className='bg-amber-400/10 text-amber-400 rounded-full px-2 py-1 text-sm'
                            >
                              {typeof tag === 'object' && tag !== null && 'name' in tag ? tag.name : 'Unknown Tag'}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </a>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
