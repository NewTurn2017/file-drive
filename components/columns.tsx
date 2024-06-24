'use client'

import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { ColumnDef } from '@tanstack/react-table'
import { useQuery } from 'convex/react'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FileCardActions } from './file-actions'

const UserCell = ({ userId }: { userId: Id<'users'> }) => {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId,
  })
  return (
    <div>
      <div className='flex gap-x-2 text-xs text-gray-700 items-center'>
        <Avatar className='size-6'>
          <AvatarImage src={userProfile?.image} alt={userProfile?.name} />
          <AvatarFallback>{userProfile?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        {userProfile?.name}
      </div>
    </div>
  )
}

export const columns: ColumnDef<
  Doc<'files'> & {
    isFavorited: boolean
    url: string | null
  }
>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    header: 'User',
    cell: ({ row }) => {
      return <UserCell userId={row.original.userId} />
    },
  },
  {
    header: '업로드 날짜',
    cell: ({ row }) => {
      const file = row.original
      return (
        <div>
          {formatDistanceToNow(file._creationTime, {
            addSuffix: true,
            locale: ko,
          })}
        </div>
      )
    },
  },
  {
    header: '액션',
    cell: ({ row }) => {
      return (
        <div>
          <FileCardActions
            file={row.original}
            isFavorited={row.original.isFavorited}
          />
        </div>
      )
    },
  },
]
