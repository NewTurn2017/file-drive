'use client'

import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, useSession } from '@clerk/clerk-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const Home = () => {
  const session = useSession()
  return (
    <div>
      <SignedIn>
        <SignOutButton>
          <Button>로그아웃</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>로그인</Button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}

export default Home
