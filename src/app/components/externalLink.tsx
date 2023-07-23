import Link from "next/link";
import {ExportOutlined, QrcodeOutlined} from "@ant-design/icons";
import {Button, Popover, QRCode} from "antd";

export default function ExternalLink(props:  {href: string, title: string} ) {
    return <><Link href={props.href} target="_blank">{props.title} <ExportOutlined/></Link> <Popover content={<QRCode value={props.href} />}><Button type="link" icon={<QrcodeOutlined/>}/></Popover> </>
}