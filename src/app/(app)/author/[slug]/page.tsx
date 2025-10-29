import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import {
  Card,
  CardContent,
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

export default async function AuthorPage({params}: {params: {slug: string}}) {
  const payload = await getPayload({ config });
  
  const author = await payload.findByID({
    collection: 'authors',
    id: params.slug
  });

  return (
    <div className='flex flex-col items-left min-h-screen min-w-screen pt-16 px-8 sm:px-16 md:px-24 lg:px-32 gap-4'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Authors</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className='text-amber-500'>
              {author.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className='justify-stretch w-full h-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-amber-950/20 shadow-lg'>
        <CardContent className='flex flex-row gap-2'>
          <Icon iconNode={featherText} className='h-4 w-4 text-amber-400' />
          <CardTitle>
            {typeof author === 'object' && author !== null
              ? `${author.name}`
              : 'Author information not available'}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}