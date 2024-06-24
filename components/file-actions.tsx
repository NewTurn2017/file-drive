import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Download,
  MoreVertical,
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
import { cn } from '@/lib/utils'

export function FileCardActions({
  file,
  isFavorited,
}: {
  file: Doc<'files'>
  isFavorited: boolean
}) {
  const { toast } = useToast()

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const deleteFile = useMutation(api.files.deleteFile)
  const restoreFile = useMutation(api.files.restoreFile)
  const toggleFavorite = useMutation(api.files.toggleFavorite)
  const me = useQuery(api.users.getMe)

  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말로 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 파일을 휴지통으로 이동합니다. 파일은 주기적으로
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
                  title: '파일이 휴지통으로 이동되었습니다.',
                  description: '파일은 주기적으로 삭제됩니다.',
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
            onClick={() => {}}
            className='flex gap-1 items-center cursor-pointer'
          >
            <div className='flex gap-1 items-center cursor-pointer'>
              <Download className='w-4 h-4' />
              다운로드
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({ fileId: file._id })

              toast({
                duration: 1000,
                variant: 'default',
                title: `${isFavorited ? '즐겨찾기 해제' : '즐겨찾기 등록'}`,
                description: `${isFavorited ? '파일이 즐겨찾기에 해제되었습니다.' : '파일이 즐겨찾기에 등록되었습니다.'}`,
              })
            }}
            className='flex gap-1 items-center cursor-pointer'
          >
            <div className='flex gap-1 items-center cursor-pointer'>
              {isFavorited ? (
                <StarIcon className='w-4 h-4 fill-black' />
              ) : (
                <StarIcon className='w-4 h-4' />
              )}
              즐겨찾기
            </div>
          </DropdownMenuItem>

          <Protect
            condition={(check) => {
              return (
                check({
                  role: 'org:admin',
                }) || file.userId === me?._id
              )
            }}
            fallback={<></>}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldDelete) {
                  restoreFile({ fileId: file._id })
                  toast({
                    duration: 1000,
                    variant: 'default',
                    title: '파일이 복구되었습니다.',
                  })
                } else {
                  setIsConfirmOpen(true)
                }
              }}
              className='flex gap-1 items-center cursor-pointer'
            >
              <div
                className={cn(
                  'flex gap-1 items-center cursor-pointer',
                  file.shouldDelete ? 'text-green-600' : 'text-red-600'
                )}
              >
                {file.shouldDelete ? (
                  <UndoIcon className='w-4 h-4' />
                ) : (
                  <TrashIcon className='w-4 h-4' />
                )}
                {file.shouldDelete ? '복구' : '삭제'}
              </div>
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
