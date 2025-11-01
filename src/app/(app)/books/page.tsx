import { getPayload } from 'payload';
import config from '@payload-config';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookCopy, Icon } from 'lucide-react';
import { featherText } from '@lucide/lab';

export const dynamic = 'force-dynamic';

export default async function Books() {
  const payload = await getPayload({ config });
  
  const books = await payload.find({
    collection: 'books'
  });

  return (
    <div className='flex flex-col items-center min-h-screen min-w-screen'>
      <div className='grid px-8 sm:px-16 md:px-24 2xl:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-32 gap-4 self-stretch'>
        {books.docs.map((book) => (
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
                  <a href={`/author/${typeof book.author === 'object' && book.author !== null && 'id' in book.author ? book.author.id : '#'}`} className='hover:text-amber-300 hover:underline'>
                    {typeof book.author === 'object' && book.author !== null
                      ? `${book.author.name}`
                      : 'Author information not available'}
                  </a>
                </div>
                <div className='flex items-center gap-2'>
                  <BookCopy className='h-4 w-4 text-amber-400' />
                  <p>
                    {book.volumes ? `${book.volumes} Volume${book.volumes > 1 ? 's' : ''}` : 'Unknown Volumes'}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
