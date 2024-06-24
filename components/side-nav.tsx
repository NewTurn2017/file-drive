'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { FileIcon, StarIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard/files', icon: FileIcon, label: '모든 파일' },
  { href: '/dashboard/favorites', icon: StarIcon, label: '즐겨찾기' },
  { href: '/dashboard/trash', icon: Trash2Icon, label: '휴지통' },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className='w-40 flex flex-col gap-4'>
      {navItems.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href}>
          <Button
            variant={'link'}
            className={clsx('flex gap-2', {
              'text-blue-500 font-semibold': pathname.includes(href),
            })}
          >
            <Icon /> {label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
