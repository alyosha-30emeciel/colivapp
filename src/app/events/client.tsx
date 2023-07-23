"use client"
import {format, parseJSON} from 'date-fns'
import {fr} from "date-fns/locale";
import Events from "./events";


const long_date_formatter = (v: string) => {
    try {
        const d = parseJSON(v)
        return `${format(d, 'PPP à pp', {locale: fr})}`
    }
    catch (e) {
        return ""
    }

}
export default function Client(props: {data: any}) {

  return <>
        <Events data={props.data} />
      <div style={{ textAlign: 'center' }}>Dernière mise à jour des données : {long_date_formatter(props.data.ts)}</div>

  </>

}
