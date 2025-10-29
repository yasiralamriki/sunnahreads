import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Icon } from 'lucide-react';
import { featherText } from '@lucide/lab';

export const dynamic = 'force-dynamic';

export default async function BookPage({params}: {params: {slug: string}}) {
  const payload = await getPayload({ config });
  
  const book = await payload.findByID({
    collection: 'books',
    id: params.slug
  });

  return (
    <div className='flex flex-col items-left min-h-screen min-w-screen pt-16 px-8 sm:px-16 md:px-24 lg:px-32 gap-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Books</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-amber-500'>
              {book.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='justify-stretch w-full h-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-lg'>
        <CardHeader className='items-start'>
          <img 
            src={book.image && typeof book.image === 'object' && 'url' in book.image && book.image.url ? book.image.url : '/placeholder.jpg'}
            alt={book.image && typeof book.image === 'object' && 'alt' in book.image && book.image.alt ? book.image.alt : 'Book Cover'} 
            className='h-auto max-h-96 object-contain'
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{book.title}</CardTitle>
        </CardContent>
        <CardFooter className='gap-2'>
          <Icon iconNode={featherText} className='h-4 w-4 text-amber-400' />
          <p>
            {typeof book.author === 'object' && book.author !== null
              ? `${book.author.name}`
              : 'Author information not available'}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}