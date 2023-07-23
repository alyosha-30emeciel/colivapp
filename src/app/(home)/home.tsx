import {Button, Card, Col, Row, Statistic} from "antd";
import {useRouter} from "next/navigation";
import React from "react";
import {stat_formatter, stat_with_decimal_formatter} from "@/app/components/common";
import {RightOutlined} from "@ant-design/icons";

export default function Home(props: {data: any}) {
    const router = useRouter()
    function MoreButton(props: {href: string}) {
        return <Button type="primary" onClick={() => {router.push(props.href)}}>Plus <RightOutlined /></Button>
    }


    return <>
        <Row gutter={16}>
            <Col span={6}>
                <Card title="Coliving" extra={<MoreButton href="/coliving" />}>
                    <Statistic title="# colivers" value={props.data.coliving.length} formatter={stat_formatter}/>
                </Card>
            </Col>
            <Col span={6}>
        <Card title="Compte course" extra={<MoreButton href="/shared-account" />}>
            <Statistic title="Solde" value={props.data.courses.balance} suffix="€" formatter={stat_with_decimal_formatter}/>
        </Card>
            </Col>
            <Col span={6}>
                <Card title="Évènements" extra={<MoreButton href="/events" />}>
                    <Statistic title="# évènements" value={props.data.events.length} formatter={stat_formatter}/>
                </Card>
            </Col>

        </Row>

    </>
}