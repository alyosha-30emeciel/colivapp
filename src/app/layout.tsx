import 'server-only'
import type { Metadata } from 'next'
import LayoutClient from "@/app/layout_client";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Coliv\'Info',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body style={{margin: 0, padding: 0}}>
    <LayoutClient>
      {children}
      <Analytics />
    </LayoutClient>
    </body>
    </html>
  )
}
