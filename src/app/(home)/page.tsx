import 'server-only'
import Client from "@/app/(home)/client";
import {getData} from "@/app/components/data";

export default async function Home() {
  const data = await getData()

  return <><Client data={data} /></>

}
