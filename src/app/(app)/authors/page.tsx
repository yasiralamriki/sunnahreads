import { getPayload } from 'payload';
import config from '@payload-config';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const payload = await getPayload({ config });

export default async function Authors() {
  const authors = await payload.find({
    collection: 'authors'
  });

  return (
    <div className='flex flex-col items-center justify-enter min-h-screen min-w-screen'>
      <div className='grid px-8 sm:px-16 md:px-24 2xl:px-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pt-32 gap-4 self-stretch'>
        {authors.docs.map((author) => (
          <a href={`/author/${author.id}`} key={author.id}>
            <Card className='border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-lg hover:scale-[1.02] transition-transform h-full'>
              <CardHeader>
                <CardTitle>{author.name}</CardTitle>
              </CardHeader>
              <CardFooter>
                <p>Details Placeholder</p>
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
