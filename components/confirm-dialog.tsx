'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

interface ConfirmDialogProps {
  children: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
  title: string
  message: string
  confirmText: string
  cancelText: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ConfirmDialog = ({
  children,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText,
  isOpen,
  setIsOpen,
}: ConfirmDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      {children}
    </AlertDialog>
  )
}

export default ConfirmDialog
