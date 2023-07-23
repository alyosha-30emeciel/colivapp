"use client"
import {Col, ConfigProvider, Layout, Menu, MenuProps, Row} from "antd";
import Image from "next/image";
import logoImage from "@/app/logo3.png";
import React from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {CalendarOutlined, CoffeeOutlined, CreditCardOutlined, HomeOutlined, LinkOutlined} from "@ant-design/icons";
import {usePathname, useRouter} from 'next/navigation'


export default function LayoutClient({
                                         children,
                                     }: {
    children: React.ReactNode
}) {


    const items: MenuProps['items'] = [
        {
            label: 'Home',
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: 'Coliving',
            key: '/coliving',
            icon: <CoffeeOutlined />,
        },
        {
            label: 'Compte course',
            key: '/shared-account',
            icon: <CreditCardOutlined />,
        },
        {
            label: 'Évènements',
            key: '/events',
            icon: <CalendarOutlined />,
        },
        {
            label: 'Liens',
            key: '/links',
            icon: <LinkOutlined />,
        },


    ];
    const router = useRouter()
    const pathname = usePathname()

    return <>
        <ConfigProvider
            theme={{ token: {  borderRadius: 6,
                colorPrimary: '#b217ff' } }}>
            <Layout>
                <Header style={{paddingLeft: 4}}>
                    <Row wrap={false}>
                        <Col flex="none">
                    <Image src={logoImage} alt="logo" height={70}/>
                            </Col>
                        <Col flex="auto">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={items}
                        selectedKeys={[pathname]}
                        onClick={({key}) => {
                            router.push(key)
                        }}
                        />
                        </Col>
                    </Row>
                </Header>

                <Content style={{ padding: '8px 20px' }}>
        {children}
                </Content>
                <Footer></Footer>
            </Layout>
    </ConfigProvider>
    </>
}