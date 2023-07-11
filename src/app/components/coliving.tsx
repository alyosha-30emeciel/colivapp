import {Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {
    CheckCircleOutlined,
    ExclamationCircleOutlined, QuestionCircleOutlined,
    SyncOutlined,
    TrophyOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {format, parseJSON} from "date-fns";
import {fr} from "date-fns/locale";

const date_formatter = (v:Date) => {
    try {
        return format(v, 'eee d MMM', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}
const statusToTagProps = new Map<string, any>([
    ["Paiement en attente", {
        icon: <QuestionCircleOutlined />,
        t: "En attente",
        color: "warning"
    }],
    ["Confirmé", {
        icon: <CheckCircleOutlined />,
        t: "Confirmée",
        color: "success"
    }],
    ["declined", {
        icon: <ExclamationCircleOutlined />,
        t: "Refusée",
        color: "danger"
    }]
])

const status_formatter = (v: string) => {
    const res = statusToTagProps.get(v)
    if (!res) {
        return <Tag icon={<ExclamationCircleOutlined />} color="danger">Inconnue</Tag>
    }
    const {icon, t, color} =  res
    return <Tag icon={icon} color={color}>{t}</Tag>
}

const night_solde_formatter = (v: number) => <span>{v} {v < 0 && <WarningOutlined style={{color:"orange"}} />}</span>

const name_formatter = (v:string, record:any) => {
    return <>{v}{record.no_seva_option && <> <Tag color="gold" icon={<TrophyOutlined />}>SANS Sevā</Tag></>}</>
}

function BookingsTable(props: { dataSource: any }) {
    return <Table dataSource={props.dataSource} bordered pagination={false} size="middle" rowKey="id">
        <Column title="Statut" dataIndex="status" render={status_formatter} width="100px"/>
        <Column title="Nom" dataIndex="name" render={name_formatter}/>
        <Column title="Invité par" dataIndex="invited_by"/>
        <Column title="Arrivée" dataIndex="arrival_date" render={date_formatter}/>
        <Column title="Départ" dataIndex="departure_date" render={date_formatter}/>
        <Column title="Solde nuits" dataIndex="nights_balance" render={night_solde_formatter} width="100px"/>
    </Table>;
}

export default function Coliving(props: {data: any}) {

    const bookings = props.data.coliving.map((r: any) => ({
        ...r,
        arrival_date: parseJSON(r.arrival_date),
        departure_date: parseJSON(r.departure_date),
    }))
    const today = new Date()
    const current_bookings = bookings.filter((r: any) => r.arrival_date <= today )
    const future_bookings = bookings.filter((r: any) => r.arrival_date > today )
    return <>
        <h3>Réservations en cours</h3>
        <BookingsTable dataSource={current_bookings}/>
        <h3>Réservations à venir</h3>
        <BookingsTable dataSource={future_bookings}/>
    </>;
}