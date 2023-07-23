"use client"
import React from 'react';
import {Layout,} from 'antd';
import {format, parseJSON} from 'date-fns'
import {fr} from "date-fns/locale";
import CompteCourse from "@/app/shared-account/shared_account";

const { Header, Content, Footer } = Layout;

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
        <CompteCourse data={props.data} />
      <div style={{ textAlign: 'center' }}>Dernière mise à jour des données : {long_date_formatter(props.data.ts)}</div>

  </>

}
