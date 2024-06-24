'use client'

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className='relative border-b py-4 bg-gray-50 z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/logo.webp'
            alt='logo'
            width={40}
            height={40}
            className='rounded-md'
          />
          <p className='text-xl font-bold'>파일저장소</p>
        </Link>
        <div>
          <OrganizationSwitcher />
          <UserButton />

          <SignedOut>
            <SignInButton>
              <Button>로그인</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  )
}
