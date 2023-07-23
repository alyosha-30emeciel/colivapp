"use client"


import {List, Typography} from "antd";
import ExternalLink from "@/app/components/externalLink";

export default function Client(props: {}) {
    const data = [
        {
            title: "Helloasso - Stage de vie communautaire",
            href: "https://www.helloasso.com/associations/tec/boutiques/stage-de-vie-communautaire"
        },
        {
            title: "Helloasso - Compte courses",
            href: "https://www.helloasso.com/associations/tec/paiements/courses"
        },
        {
            title: "Helloasso - Coworking",
            href: "https://www.helloasso.com/associations/tec/boutiques/coworking"
        },
        {
            title: "Groupe Facebook",
            href: "https://www.facebook.com/groups/au30emeciel"
        },

    ];
  return <>
    <List
        header={<h3>Liens remarquables</h3>}
        bordered
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
              <ExternalLink href={item.href} title={item.title} />
            </List.Item>
        )}
    />
  </>

}
