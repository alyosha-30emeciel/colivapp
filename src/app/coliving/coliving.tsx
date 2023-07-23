import {Space, Table, Tabs, Tag} from "antd";
import Column from "antd/es/table/Column";
import React from "react";

import {
    CalendarOutlined,
    CheckCircleOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined, TableOutlined,
    TrophyOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {format, parseJSON} from "date-fns";
import {fr} from "date-fns/locale";
import {registerLicense} from '@syncfusion/ej2-base';
import "@syncfusion/ej2/bootstrap5.css";
import {setCulture, setCurrencyCode, L10n, loadCldr} from '@syncfusion/ej2-base';
import {
    EventRenderedArgs, EventSettingsModel,
    Inject,
    Month,
    ScheduleComponent, TimelineMonth,
    ViewDirective,
    ViewsDirective
} from "@syncfusion/ej2-react-schedule";

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhcc3VdRmVZV0dyWUM=');


loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/fr/ca-gregorian.json'),
    require('cldr-data/main/fr/numbers.json'),
    require('cldr-data/main/fr/timeZoneNames.json')
);

setCulture('fr');
setCurrencyCode('EUR');

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

const colors = [
    'yellow',
    'green',
    'pink',
    'blue',
    'yellow',
    'orange',
    'cyan',
    'red',
    'purple',
    'magenta',
    'volcano',
    'darkgreen',
]

const mapUserToColor = new Map<string, string>
function getUserColor(user_id: string) {
    let c = mapUserToColor.get(user_id)
    if (!c) {
        c = colors.pop()
        if (!c)
            c = "black"
        mapUserToColor.set(user_id, c)
    }
    return c
}
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

interface ScheduleEvent {
    Id: string,
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsAllDay: boolean
    user_id: string
}
function BookingsTable(props: { title: string, dataSource: any }) {
    return <>
        <h3>{props.title}</h3>
        <Table dataSource={props.dataSource} bordered pagination={false} size="middle" rowKey="id">
        <Column title="Statut" dataIndex="status" render={status_formatter} width="100px"/>
        <Column title="Nom" dataIndex="name" render={name_formatter}/>
        <Column title="Invité par" dataIndex="invited_by"/>
        <Column title="Arrivée" dataIndex="arrival_date" render={date_formatter}/>
        <Column title="Départ" dataIndex="departure_date" render={date_formatter}/>
        <Column title="Solde nuits" dataIndex="nights_balance" render={night_solde_formatter} width="100px"/>
    </Table>
        </>
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

    function onEventRendered(args: EventRenderedArgs): void {
        let user_id = args.data.user_id as string;
        if (!args.element || !user_id) {
            return;
        }
        args.element.style.backgroundColor = getUserColor(user_id);
    }
    const data = bookings.map((r: any): ScheduleEvent => ({ Id: r.id,
        Subject: r.name,
        StartTime: r.arrival_date,
        EndTime: r.departure_date,
        IsAllDay: true,
        user_id: r.name}))
    const eventSettings: EventSettingsModel = { dataSource: data};
    return <>
        <Tabs items={[
            {
                key: "calendar",
                label: <span><CalendarOutlined /> Calendrier</span>,
                children: <><ScheduleComponent
                    showQuickInfo={false}
                    readonly={true}
                    firstDayOfWeek={1} /* dateFormat='dd-MMM-yyyy' */  rowAutoHeight={true} eventSettings={eventSettings} height="800px" width='auto'
                    eventRendered={onEventRendered}
                >
                    <ViewsDirective>
                        <ViewDirective option='Month' /*numberOfWeeks={4}*//>
                        <ViewDirective option='TimelineMonth' numberOfWeeks={4} />
                    </ViewsDirective>
                    <Inject services={[Month, TimelineMonth]} />
                </ScheduleComponent></>
            },
            {
                key: "tables",
                label: <span><TableOutlined /> Tableaux</span>,
                children: <><BookingsTable title="Réservations en cours" dataSource={current_bookings}/>
                    <BookingsTable title="Réservations à venir" dataSource={future_bookings}/></>
            }
        ]}>
        </Tabs>


    </>
}