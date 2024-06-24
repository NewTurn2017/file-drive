import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Doc } from '@/convex/_generated/dataModel'
import { FileCardActions } from './file-actions'
import FileIcons from '@/lib/iconMapping'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import Image from 'next/image'

export function FileCard({
  file,
}: {
  file: Doc<'files'> & {
    isFavorited: boolean
    url: string | null
  }
}) {
  const size = 30
  const icon = <FileIcons mimeType={file.type} size={size} /> || (
    <FileIcons mimeType='default' size={size} />
  )
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  })
  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-x-2 text-base font-normal items-center'>
          <div className='w-[60px] flex flex-col items-center justify-center border border-gray-200 rounded-md p-2 shadow-md shrink-0'>
            {icon}
            <p className='text-xs font-light'>{file.type}</p>
          </div>
          <p className='text-base font-normal truncate'>{file.name}</p>
        </CardTitle>
        <div className='absolute top-2 right-2'>
          <FileCardActions file={file} isFavorited={file.isFavorited} />
        </div>
      </CardHeader>
      <CardContent>
        {file.type === 'image' && file.url && (
          <Image alt={file.name} width='200' height='100' src={file.url} />
        )}
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex gap-x-2 text-xs text-gray-700 items-center'>
          <Avatar className='size-6'>
            <AvatarImage src={userProfile?.image} alt={userProfile?.name} />
            <AvatarFallback>{userProfile?.name?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className='text-xs text-gray-700'>
          {formatDistanceToNow(file._creationTime, {
            addSuffix: true,
            locale: ko,
          })}
        </div>
      </CardFooter>
    </Card>
  )
}
