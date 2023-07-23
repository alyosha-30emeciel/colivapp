import Link from "next/link";
import {ExportOutlined, QrcodeOutlined} from "@ant-design/icons";
import {Button, Popover, QRCode, Space} from "antd";
import React from "react";
export default function ExternalLink(props:  {href: string, title: string} ) {
    return <>
        <Space direction="horizontal">
            <Link href={props.href} target="_blank">{props.title} <ExportOutlined/></Link>
            <Popover content={<QRCode size={256} icon="/logo.png" value={props.href} />}><Button type="link" icon={<QrcodeOutlined/>}/></Popover>
        </Space></>
}