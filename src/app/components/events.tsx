import {Table, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {CheckCircleOutlined, ExclamationCircleOutlined, SyncOutlined} from "@ant-design/icons";
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

export default function Events(props: {data: any}) {
    return <>
        <h3>Prochains évenements</h3>
        <Table dataSource={props.data.events} bordered pagination={false} size="middle" rowKey="id">
            <Column title="Nom" dataIndex="name"/>
            <Column title="Organisataire" dataIndex="organizer"/>
            <Column title="Début" dataIndex="start_date" render={date_formatter} />
            <Column title="Fin" dataIndex="end_date" render={date_formatter} />
        </Table>
    </>;
}