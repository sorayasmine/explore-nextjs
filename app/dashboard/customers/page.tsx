import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { InvoiceSkeleton } from '@/app/ui/skeletons';
import { fetchCustomersPage } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers',
};
export default async function Page(props: {
  readonly searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomersPage(query);

  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoiceSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}