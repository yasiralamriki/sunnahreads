import { getPayload } from 'payload';
import config from '@payload-config';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { BookCopy, Icon } from 'lucide-react';
import { featherText } from '@lucide/lab';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Books({ searchParams }: { searchParams: { page?: string } }) {
  const payload = await getPayload({ config });
  const currentPage = Number(searchParams.page) || 1;
  
  const books = await payload.find({
    collection: 'books',
    page: currentPage,
    limit: 10,
    pagination: true
  });

  return (
    <div className='flex flex-col items-center min-h-screen min-w-screen'>
      <div className='grid px-8 sm:px-16 md:px-24 2xl:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-16 gap-4 self-stretch'>
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
      </div>
      <div className='self-stretch pb-32'>
        <Pagination className='text-amber-400'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                className='hover:!bg-amber-400/10 hover:!text-amber-400 cursor-pointer' 
                href={`?page=${currentPage === 1 ? 1 : currentPage - 1}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                className='hover:!bg-amber-400/10 hover:!text-amber-400 cursor-pointer'
                href={`?page=${currentPage === 1 ? 1 : currentPage - 1}`}
              >
                {currentPage === 1 ? 1 : currentPage - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                className='hover:!bg-amber-400/10 hover:!text-amber-400 cursor-pointer'
                href={`?page=${currentPage === 1 ? 2 : currentPage}`}
              >
                {currentPage === 1 ? 2 : currentPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink 
                className='hover:!bg-amber-400/10 hover:!text-amber-400 cursor-pointer'
                href={`?page=${currentPage === 1 ? 3 : currentPage + 1}`}
              >
                {currentPage === 1 ? 3 : currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                className='hover:!bg-amber-400/10 hover:!text-amber-400 cursor-pointer' 
                href={`?page=${currentPage + 1}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
