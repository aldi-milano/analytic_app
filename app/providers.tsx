'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  // Menggunakan useState agar instance QueryClient konsisten di browser
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data dianggap 'fresh' selama 1 menit (tidak re-fetch berlebihan)
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}