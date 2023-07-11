import CountUp from "react-countup";
import {
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    FileExclamationOutlined,
    FileProtectOutlined,
    SyncOutlined
} from "@ant-design/icons";
import {Card, Statistic, Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";
import {date_formatter} from "@/app/components/common";

const stat_formatter = (value: any) => <CountUp end={value} separator="," decimals={2}/>;
const currency_formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

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

const status_formatter = (v: string) => {
    const {icon, t, color} = statusToTagProps.get(v)
    return <Tag icon={icon} color={color}>{t}</Tag>
}

const attachment_render = (v: string, record: any) => {
    return record.needs_attachment ? <Tag icon={<FileExclamationOutlined />} color="warning">Manquant</Tag> : <Tag icon={<FileProtectOutlined />} color="success">OK</Tag>
}
export default function CompteCourse(props: {data: any}) {


    return <>
        <Card bordered={false}>
            <Statistic title="Solde" value={props.data.courses.balance} suffix="€" formatter={stat_formatter}/>
        </Card>

        <h3>Dernières transactions :</h3>
        <Table dataSource={props.data.courses.last_transactions} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Statut" dataIndex="status" render={status_formatter} width="80px"/>
            <Column title="Date" dataIndex="emitted_at" render={date_formatter} width="160px"/>
            <Column title="Description" dataIndex="label"/>
            <Column title="Justificatif" dataIndex="needs_attachment" render={attachment_render}/>
            <Column title="€" dataIndex="amount" align="right"
                    render={(value:number, record:any) => currency_formatter.format((record.side == "debit" ? -1 : 1) * value)}/>
        </Table>
    </>;
}