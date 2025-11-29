import { getPayload } from 'payload';
import config from '@payload-config';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Authors() {
  const payload = await getPayload({ config });
  
  const authors = await payload.find({
    collection: 'authors'
  });

  return (
    <div className='flex flex-col items-center justify-enter min-h-screen min-w-screen'>
      <div className='grid px-8 sm:px-16 md:px-24 2xl:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-32 gap-4 self-stretch'>
        {authors.docs.map((author) => (
          <a href={`/author/${author.id}`} key={author.id}>
            <Card className='border-2 border-amber-600/30 dark:border-amber-400/30 bg-gradient-to-br from-amber-50/40 to:amber-50/20 dark:from-amber-950/40 dark:to-amber-950/20 shadow-lg hover:scale-[1.02] transition-transform h-full'>
              <CardHeader>
                <CardTitle>{author.displayName}</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-amber-400' />
                  <p>
                    {author.deathDate ? `Died ${author.deathDate} (Hijri)` : 'Unknown Death Date'}
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
