'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react'

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data, error } = trpc.authCallback.useQuery();
  if(error?.data?.code==='UNAUTHORIZED')router.push('/');
  if(data?.success)router.push('/dashboard')
  useEffect(() => {
    // Additional client-side logic can be added here if needed
  }, []); // Empty dependency array ensures the effect runs only once on mount

  if (!router) {
    // Return loading state if router is not available (during prerendering)
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }

  // Continue with the rest of your component logic for the client-side

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

function Searchbar() {
    return (
      // You could have a loading skeleton as the `fallback` too
      <Suspense>
        <Page />
      </Suspense>
    )as JSX.Element
  }
export default Searchbar;