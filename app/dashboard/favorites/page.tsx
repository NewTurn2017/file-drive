'use client'

import { FileBrowser } from '@/components/file-browser'
import React from 'react'

const FavoritesPage = () => {
  return (
    <div>
      <FileBrowser title='즐겨찾기' favoritesOnly />
    </div>
  )
}

export default FavoritesPage
