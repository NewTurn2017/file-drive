import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { ReactNode } from 'react'
import { useQuery } from 'convex/react'

import Image from 'next/image'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { FileCardActions } from './file-actions'
import { Button } from './ui/button'
import FileIcons from '@/lib/iconMapping'

export function FileCard({ file }: { file: Doc<'files'> }) {
  const size = 30
  const icon = <FileIcons mimeType={file.type} size={size} /> || (
    <FileIcons mimeType='default' size={size} />
  )

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-x-2 text-base font-normal items-center'>
          <div className='w-[50px] flex flex-col items-center justify-center'>
            {icon}
            <p>{file.type}</p>
          </div>
          <p className='text-2xl font-semibold'>{file.name}</p>
        </CardTitle>
        <div className='absolute top-2 right-2'>
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent>
        {/* {file.type === 'image' && (
          <Image
            src={getFileUrl(file.fileId)}
            alt={file.name}
            width={200}
            height={100}
          />
        )} */}
      </CardContent>
      <CardFooter className='flex justify-center items-center w-full'>
        <Button onClick={() => {}}>다운로드</Button>
      </CardFooter>
    </Card>
  )
}
