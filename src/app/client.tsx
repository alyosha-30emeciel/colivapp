"use client"
import React from 'react';
import {CalendarOutlined, CheckCircleOutlined, CoffeeOutlined, CreditCardOutlined,
    ExclamationCircleOutlined, SyncOutlined} from '@ant-design/icons';
import {Card, Statistic, Table, Tabs, Tag} from 'antd';
import { Tab } from 'rc-tabs/lib/interface'
import Column from "antd/es/table/Column";
import CountUp from "react-countup";
import {format, parseISO} from 'date-fns'
import {fr} from "date-fns/locale";

const formatter = (value: any) => <CountUp end={value} separator="," decimals={2}/>;
const currency_formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

const date_formatter = (v:string) => {
    try {
        const d = parseISO(v)
        return format(d, 'P p', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}

const statusToTagProps = new Map<string, any>([
    ["pending", {
        icon: <SyncOutlined spin />,
        t: "En cours",
        color: "processing"
    }],
    ["completed", {
        icon: <CheckCircleOutlined />,
        t: "Terminée",
        color: "success"
    }],
    ["declined", {
        icon: <ExclamationCircleOutlined />,
        t: "Refusée",
        color: "danger"
    }]
])

const status_formatter = (v: string, record: any) => {
    const {icon, t, color} = statusToTagProps.get(v)
    return <Tag icon={icon} color={color}>{t}</Tag>
}
export default function Client(props: {data: any}) {
    function CompteCourse() {


        return <>
            <h1><CreditCardOutlined /> Compte courses</h1>
            <Card bordered={false}>
            <Statistic title="Solde" value={props.data.courses.balance} suffix="€" formatter={formatter}/>
            </Card>

            <h3>Dernières transactions :</h3>
            <Table dataSource={props.data.courses.last_transactions} bordered pagination={false} size="middle" rowKey="id">
                <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
                <Column title="Date" dataIndex="emitted_at" render={date_formatter} width="160px"/>
                <Column title="Description" dataIndex="label" />
                <Column title="€" dataIndex="amount" align="right"
                        render={(value, record:any, index) => currency_formatter.format((record.side == "debit" ? -1 : 1) * value)}/>
            </Table>
        </>;
    }
    function Colivers() {
        return <>
            <h1>Réservations coliving</h1>
            <img src="wip.png"/>
        </>;
    }

    function Events() {
        return <>
            <h1>Prochains événements</h1>
            <img src="wip.png"/>

        </>;
    }
    const tabs:Tab[] = [
        {
            label: <span><CreditCardOutlined /> Compte course</span>,
            key: "compte-course",
            children: <CompteCourse />
        },
        {
            label: <span><CoffeeOutlined /> Colivers</span>,
            key: "colivers",
            children: <Colivers />
        },
        {
            label: <span><CalendarOutlined /> Événements</span>,
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
