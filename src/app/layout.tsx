import 'server-only'
import './vars.css'
import './globals.css'
import type { Metadata } from 'next'
import LayoutClient from "@/app/layout_client";

export const metadata: Metadata = {
  title: 'colivinfo',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body><LayoutClient>{children}</LayoutClient></body>
    </html>
  )
}
