import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { FileTextIcon, GanttChartIcon, ImageIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { useQuery } from 'convex/react'

import Image from 'next/image'
import { Doc } from '@/convex/_generated/dataModel'
import { FileCardActions } from './file-actions'

export function FileCard({ file }: { file: Doc<'files'> }) {
  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='flex gap-2 text-base font-normal'>
          {file.name}
        </CardTitle>
        <div className='absolute top-2 right-2'>
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent className='h-[200px] flex justify-center items-center'>
        Content
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex gap-2 text-xs text-gray-700 w-40 items-center'></div>
      </CardFooter>
    </Card>
  )
}
