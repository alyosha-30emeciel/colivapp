import 'server-only'
import React from 'react';
import Client from "@/app/client";

const url = process.env.DATA_ENDPOINT_URL!

async function getData() {
  const res = await fetch(url, { next: { revalidate: 30 } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()

  return <><Client data={data} /></>

}
