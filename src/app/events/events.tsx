import {Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {format, parseISO} from "date-fns";
import {fr} from "date-fns/locale";
import ExternalLink from "@/app/components/externalLink";

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
    t: "Confirmé",
    color: "success"
}

const canceledTag = {
    icon: <ExclamationCircleOutlined />,
    t: "Annulé",
    color: "grey"
}

const unknownTag = {
    icon: <DeleteOutlined />,
    t: "Inconnu",
    color: "grey"
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
    const res = statusToTagProps.get(v) || unknownTag
    const {icon, t, color} =  res
    return <Tag icon={icon} color={color}>{t}</Tag>
}

export default function Events(props: {data: any}) {
    function name_render(v: string, record: any) {
        return record.url ? <ExternalLink href={record.url} title={v}/> :<>{v}</>
    }

    return <>
        <h3>Prochains évenements</h3>
        <Table dataSource={props.data.events} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
            <Column title="Nom" dataIndex="name" render={name_render}/>
            <Column title="Organisataire" dataIndex="organizer"/>
            <Column title="Début" dataIndex="start_date" render={date_formatter} />
            <Column title="Fin" dataIndex="end_date" render={date_formatter} />
        </Table>
    </>;
}