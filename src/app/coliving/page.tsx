import {getData} from "@/app/data";
import Client from "./client";

export default async function Page() {
    const data = await getData()
    return <Client data={data} />
}