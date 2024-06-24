import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Doc } from '@/convex/_generated/dataModel'
import { FileCardActions } from './file-actions'
import { Button } from './ui/button'
import FileIcons from '@/lib/iconMapping'

export function FileCard({
  file,
  favorites,
}: {
  file: Doc<'files'>
  favorites?: Doc<'favorites'>[]
}) {
  const size = 30
  const icon = <FileIcons mimeType={file.type} size={size} /> || (
    <FileIcons mimeType='default' size={size} />
  )
  const isFavorite = favorites?.some((favorite) => favorite.fileId === file._id)

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
          <FileCardActions file={file} isFavorite={isFavorite} />
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
