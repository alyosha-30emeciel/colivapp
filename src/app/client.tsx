"use client"
import React from 'react';
import {CalendarOutlined, CoffeeOutlined, CreditCardOutlined} from '@ant-design/icons';
import {Card, Statistic, Table, Tabs} from 'antd';
import { Tab } from 'rc-tabs/lib/interface'
import Column from "antd/es/table/Column";
import CountUp from "react-countup";
import {format, parseISO} from 'date-fns'
import {fr} from "date-fns/locale";

const formatter = (value: any) => <CountUp end={value} separator="," decimals={2}/>;
const currency_formater = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

export default function Client(props: {data: any}) {
    function CompteCourse() {


        return <>
            <h1><CreditCardOutlined /> Compte courses</h1>
            <Card bordered={false}>
            <Statistic title="Solde" value={props.data.courses.balance} suffix="€" formatter={formatter}/>
            </Card>

            <h3>Dernières transactions :</h3>
            <Table dataSource={props.data.courses.last_transactions} bordered pagination={false} size="middle">
                <Column title="Date" dataIndex="settled_at" key="settled_at" render={(v) => format(parseISO(v), 'P p', {locale: fr})}/>
                <Column title="Description" dataIndex="label" key="label"/>
                <Column title="€" dataIndex="amount" key="amount" align="right"
                        render={(value, record:any, index) => currency_formater.format((record.side == "debit" ? -1 : 1) * value)}/>
            </Table>
        </>;
    }
    function Colivers() {
        return <>
            <h1>Réservations coliving</h1>
            <ul>
                <li>10/02/2022 NATURALIA -50,20€</li>
            </ul>
        </>;
    }

    function Events() {
        return <>
            <h1>Prochains événements</h1>
            <ul>
                <li>10/02/2022 NATURALIA -50,20€</li>
            </ul>
        </>;
    }
    const tabs:Tab[] = [
        {
            label: <span><CreditCardOutlined /> Compte course</span>,
            key: "compte-course",
            children: <CompteCourse/>
        },
        {
            label: <span><CoffeeOutlined /> Colivers</span>,
            key: "colivers",
            children: <Colivers />
        },
        {
            label: <span><CalendarOutlined /> Evénements</span>,
            key: "events",
            children: <Events />
        }

    ]
  return <><Tabs
      defaultActiveKey="1"
      size="large"
      items={tabs}
  /></>

}
