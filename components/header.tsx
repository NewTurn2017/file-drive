'use client'

import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

export const Header = () => {
  return (
    <div className='border-b py-4 bg-gray-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <div>파일저장소</div>
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
