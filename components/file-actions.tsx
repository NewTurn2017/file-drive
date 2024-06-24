import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FileIcon,
  MoreVertical,
  StarHalf,
  StarIcon,
  TrashIcon,
  UndoIcon,
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { useToast } from '@/components/ui/use-toast'
import { Protect } from '@clerk/nextjs'
import { Doc } from '@/convex/_generated/dataModel'
import { api } from '@/convex/_generated/api'

export function FileCardActions({ file }: { file: Doc<'files'> }) {
  const { toast } = useToast()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const deleteFile = useMutation(api.files.deleteFile)
  const toggleFavorite = useMutation(api.files.toggleFavorite)

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 파일을 삭제 프로세스에 표시합니다. 파일은 주기적으로
              삭제됩니다
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({ fileId: file._id })
                toast({
                  duration: 1000,
                  variant: 'default',
                  title: '파일 삭제 성공',
                  description: '파일이 성공적으로 삭제되었습니다.',
                })
              }}
            >
              계속
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id })
            }}
            className='flex gap-1 items-center cursor-pointer'
          >
            <div className='flex gap-1 items-center cursor-pointer'>
              <StarIcon className='w-4 h-4' /> 즐겨찾기
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsConfirmOpen(true)
            }}
            className='flex gap-1 items-center cursor-pointer'
          >
            <div className='flex gap-1 text-red-600 items-center cursor-pointer'>
              <TrashIcon className='w-4 h-4' /> 삭제
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
