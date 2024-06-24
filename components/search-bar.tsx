import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, SearchIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

const formSchema = z.object({
  query: z.string().min(0).max(200, {
    message: '파일이름을 최소 2글자 이상 입력하세요',
  }),
})

interface SearchBarProps {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({ query, setQuery }: SearchBarProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: query,
    },
  })

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    setQuery(values.query)
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)} className='flex gap-4'>
          <FormField
            control={form.control}
            name='query'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder='파일 이름을 입력하세요..' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size='sm'
            type='submit'
            disabled={form.formState.isSubmitting}
            className='flex gap-1'
          >
            {form.formState.isSubmitting && (
              <Loader2 className='size-4 animate-spin' />
            )}
            <SearchIcon className='size-4 mr-2' />
            검색
          </Button>
        </form>
      </Form>
    </div>
  )
}
