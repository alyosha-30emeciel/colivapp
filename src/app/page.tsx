import React from 'react';
import Client from "@/app/client";

async function getData() {
  const res = await fetch('https://hook.eu1.make.com/d8oc6ui87ysbgor5r5eoe9zucl6qfrte')
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
