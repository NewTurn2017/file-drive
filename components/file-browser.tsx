'use client'

import { FileCard } from '@/components/file-card'
import { SearchBar } from '@/components/search-bar'
import { UploadButton } from '@/components/upload-button'
import { api } from '@/convex/_generated/api'
import { useOrganization, useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { GridIcon, Loader2, Rows4Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { columns } from './columns'
import { FileTable } from './file-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
  title: string
  favoritesOnly?: boolean
  deletedOnly?: boolean
}

export const FileBrowser = ({ title, favoritesOnly, deletedOnly }: Props) => {
  const organization = useOrganization()
  const user = useUser()
  const [query, setQuery] = useState('')

  let orgId: string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : 'skip'
  )

  const files = useQuery(
    api.files.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly, deletedOnly } : 'skip'
  )

  const isLoading = files === undefined

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? []

  function Placeholder() {
    return (
      <div className='flex flex-col gap-8 items-center  justify-center w-full mt-24'>
        <Image src='/assets/empty.svg' alt='empty' width={300} height={300} />
        <p className='text-2xl'>
          파일이 없습니다. 새로운 파일을 업로드해보세요.
        </p>
        <UploadButton />
      </div>
    )
  }
  return (
    <main className='container mx-auto pt-12'>
      <div className='flex gap-8'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />

            <UploadButton />
          </div>

          <Tabs defaultValue='grid'>
            <TabsList className='mb-4'>
              <TabsTrigger value='grid'>
                <GridIcon className='size-4 mr-2' />
                그리드
              </TabsTrigger>
              <TabsTrigger value='table'>
                <Rows4Icon className='size-4 mr-2' />
                테이블
              </TabsTrigger>
            </TabsList>
            {isLoading && (
              <div className='w-full h-screen items-center justify-center flex flex-col'>
                <Loader2 className='size-24 animate-spin text-gray-500' />
                <p>로딩 중...</p>
              </div>
            )}
            <TabsContent value='grid'>
              <div className='grid grid-cols-3 gap-4 '>
                {modifiedFiles.map((file) => (
                  <FileCard key={file._id} file={file} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value='table'>
              <FileTable columns={columns} data={modifiedFiles ?? []} />
            </TabsContent>
          </Tabs>

          {files?.length === 0 && <Placeholder />}
        </div>
      </div>
    </main>
  )
}
