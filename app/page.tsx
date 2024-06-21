'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { SignInButton, SignOutButton } from '@clerk/clerk-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react'

const Home = () => {
  const files = useQuery(api.files.getFiles)
  const createFile = useMutation(api.files.createFile)
  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-y-4'>
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
      {files?.map((file) => <div key={file._id}>{file.name}</div>)}

      <Button
        onClick={() =>
          createFile({
            name: 'hello world',
          })
        }
      >
        파일 생성
      </Button>
    </main>
  )
}

export default Home
