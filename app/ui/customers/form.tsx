'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { StateCustomer, createCustomer, updateCustomer } from '@/app/lib/actions';
import { Customer } from '@/app/lib/definitions';
import { useFormStatus } from 'react-dom';

export default function Form({ customer }: { readonly customer: Customer }) {    
    const initialState: StateCustomer = { message: null, errors: {}}
    const actionMode = customer?.id ? updateCustomer.bind(null, customer?.id) : createCustomer
    const [state, formAction] = useActionState(actionMode, initialState)
    const dynamicBtnTitle = customer?.id ? 'Edit' : 'Create'
    const { pending } = useFormStatus()

    return (
        <form action={formAction}>            
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <div>
                        <input 
                            id="name"
                            name="name"
                            placeholder="Enter name"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            aria-describedby='name-error'
                            defaultValue={customer?.name || ''}
                        />
                    <div id="name-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.name?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input 
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby='email-error'
                                defaultValue={customer?.email || ''}
                            />
                        </div>
                        <div id="email-error" aria-live="polite" aria-atomic="true">
                            {state.errors?.email?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/dashboard/customers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button disabled={pending} type="submit">{dynamicBtnTitle} Customer</Button>
                </div>
        </form>
    )
}