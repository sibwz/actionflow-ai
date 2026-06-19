'use client'

import { Toaster } from 'sonner'

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#18181B',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#FAFAFA',
          fontSize: '13px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        },
      }}
    />
  )
}
