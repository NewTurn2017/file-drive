'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useOrganization, useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { z } from 'zod'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: '제목을 입력해주세요.' })
    .max(200, { message: '제목은 200자 이내여야 합니다.' }),
  file: z
    .custom<FileList>((val) => val instanceof FileList, '파일을 선택해주세요.')
    .refine((files) => files.length > 0, '파일을 선택해주세요.'),
})

export const UploadButton = () => {
  const organization = useOrganization()
  const user = useUser()
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const { toast } = useToast()
  let orgId: string | undefined = undefined
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false)

  const createFile = useMutation(api.files.createFile)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      file: undefined,
    },
  })

  const fieldRef = form.register('file')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!orgId) return
    const postUrl = await generateUploadUrl()

    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': values.file[0].type },
      body: values.file[0],
    })
    const { storageId } = await result.json()

    try {
      await createFile({
        name: values.title,
        orgId,
        fileId: storageId,
      })

      form.reset()
      setIsFileDialogOpen(false)
      toast({
        duration: 1000,
        variant: 'success',
        title: '파일 업로드 성공',
        description: '파일이 성공적으로 업로드되었습니다.',
      })
    } catch (error) {
      toast({
        duration: 1000,
        variant: 'destructive',
        title: '파일 업로드 실패',
        description: '파일 업로드에 실패했습니다.',
      })
    }
  }

  return (
    <Dialog
      open={isFileDialogOpen}
      onOpenChange={(isOpen) => {
        setIsFileDialogOpen(isOpen)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>파일 업로드</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-8'>파일 업로드</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>파일 이름</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='file'
                render={() => (
                  <FormItem>
                    <FormLabel>파일</FormLabel>
                    <FormControl>
                      <Input type='file' {...fieldRef} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                disabled={form.formState.isSubmitting}
                className='flex items-center gap-x-2'
              >
                {form.formState.isSubmitting && (
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                )}
                <span>업로드</span>
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
