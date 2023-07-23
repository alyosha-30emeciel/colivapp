import {getData} from "@/app/components/data";
import Client from "./client";

export default async function Page() {
    const data = await getData()
    return <Client data={data} />
}