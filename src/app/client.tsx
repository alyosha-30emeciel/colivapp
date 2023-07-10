"use client"
import React from 'react';
import {CalendarOutlined, CoffeeOutlined, CreditCardOutlined} from '@ant-design/icons';
import {Layout, Tabs,} from 'antd';
import { Tab } from 'rc-tabs/lib/interface'
import {format, formatDistance, formatRelative, parseJSON} from 'date-fns'
import {fr} from "date-fns/locale";
import Image from "next/image";
const { Header, Content, Footer } = Layout;
import logoImage from './logo3.png'
import CompteCourse from "@/app/components/compte_courses";
import Coliving from "@/app/components/coliving";
import Events from "@/app/components/events";


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

    const tabs:Tab[] = [
        {
            label: <span><CreditCardOutlined /> Compte course</span>,
            key: "compte-course",
            children: <CompteCourse data={props.data}/>
        },
        {
            label: <span><CoffeeOutlined /> Coliving</span>,
            key: "coliving",
            children: <Coliving data={props.data}/>
        },
        {
            label: <span><CalendarOutlined /> Événements</span>,
            key: "events",
            children: <Events data={props.data}/>
        }

    ]
  return <>
      <Layout>
          <Header>
              <Image src={logoImage} alt="logo" height={70}/>
          </Header>
          <Content style={{ padding: '8px 20px' }}>
              <Tabs
                  defaultActiveKey="1"
                  size="large"
                  items={tabs}
              />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Dernière mise à jour des données : {long_date_formatter(props.data.ts)}</Footer>
      </Layout>
  </>

}
