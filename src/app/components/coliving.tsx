import {Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {format, parseISO, parseJSON} from "date-fns";
import {fr} from "date-fns/locale";

const date_formatter = (v:Date) => {
    try {
        return format(v, 'PPPP', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}
const statusToTagProps = new Map<string, any>([
    ["Paiement en attente", {
        icon: <SyncOutlined spin />,
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

const status_formatter = (v: string, record: any) => {
    const res = statusToTagProps.get(v)
    if (!res) {
        return <Tag icon={<ExclamationCircleOutlined />} color="danger">Inconnue</Tag>
    }
    const {icon, t, color} =  res
    return <Tag icon={icon} color={color}>{t}</Tag>
}
export default function Coliving(props: {data: any}) {

    const bookings = props.data.coliving.map((r: any) => ({
        status: r.status,
        name: r.name,
        arrival_date: parseJSON(r.arrival_date),
        departure_date: parseJSON(r.departure_date),
    }))
    const today = new Date()
    const current_bookings = bookings.filter((r: any) => r.arrival_date <= today )
    const future_bookings = bookings.filter((r: any) => r.arrival_date > today )
    return <>
        <h3>Réservations en cours</h3>
        <Table dataSource={current_bookings} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
            <Column title="Nom" dataIndex="name"/>
            <Column title="Arrivée" dataIndex="arrival_date" render={date_formatter} />
            <Column title="Départ" dataIndex="departure_date" render={date_formatter} />
        </Table>
        <h3>Réservations à venir</h3>
        <Table dataSource={future_bookings} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
            <Column title="Nom" dataIndex="name"/>
            <Column title="Arrivée" dataIndex="arrival_date" render={date_formatter} />
            <Column title="Départ" dataIndex="departure_date" render={date_formatter} />
        </Table>
    </>;
}