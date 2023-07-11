import {Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
import {format, parseISO} from "date-fns";
import {fr} from "date-fns/locale";

const date_formatter = (v:string) => {
    try {
        const d = parseISO(v)
        return format(d, 'PPPP pp', {locale: fr}) as string
    }
    catch (e) {
        return ""
    }

}

const waitTag = {
    icon: <ClockCircleOutlined />,
    t: "En attente",
    color: "warning"
}
const confirmedTag = {
    icon: <CheckCircleOutlined />,
    t: "Confirmée",
    color: "success"
}

const canceledTag = {
    icon: <ExclamationCircleOutlined />,
    t: "Refusée",
    color: "danger"
}

const statusToTagProps = new Map<string, any>([
    ["En attente d'info", waitTag],
    ["En attente paiement", confirmedTag],
    ["Payé", confirmedTag],
    ["Réservé (payé à 50%)", confirmedTag],
    ["Au %", confirmedTag],
    ["Annulé", canceledTag]
])

const status_formatter = (v: string, record: any) => {
    const res = statusToTagProps.get(v)
    if (!res) {
        return <Tag icon={<ExclamationCircleOutlined />} color="danger">Inconnue</Tag>
    }
    const {icon, t, color} =  res
    return <Tag icon={icon} color={color}>{t}</Tag>
}

export default function Events(props: {data: any}) {
    return <>
        <h3>Prochains évenements</h3>
        <Table dataSource={props.data.events} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
            <Column title="Nom" dataIndex="name"/>
            <Column title="Organisataire" dataIndex="organizer"/>
            <Column title="Début" dataIndex="start_date" render={date_formatter} />
            <Column title="Fin" dataIndex="end_date" render={date_formatter} />
        </Table>
    </>;
}