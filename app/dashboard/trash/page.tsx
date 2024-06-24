import { FileBrowser } from '@/components/file-browser'

const TrashPage = () => {
  return (
    <div>
      <FileBrowser title='휴지통' deletedOnly />
    </div>
  )
}

export default TrashPage
