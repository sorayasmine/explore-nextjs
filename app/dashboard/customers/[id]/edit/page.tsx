import Form from "@/app/ui/customers/form"
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs"
import { Metadata } from "next"
import { fetchCustomerById } from "@/app/lib/actions"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
    title: 'Edit Customer'
}

export default async function Page(props: {readonly params: Promise<{ id :string}>}) {
    const params = await props.params;
    const id = params.id;
    const customer = await fetchCustomerById(id)
    
    if (!customer) {
        notFound()
    }

    return(
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customer', href: '/dashboard/customers' },
                    {
                        label: 'Edit Customer',
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form customer={customer} />
        </main>
    )
}