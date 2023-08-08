"use client"
import {Col, ConfigProvider, Layout, Menu, MenuProps, Row, Skeleton, Spin} from "antd";
import Image from "next/image";
import logoImage from "@/app/logo3.png";
import React, {useEffect, useState} from "react";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {CalendarOutlined, CoffeeOutlined, CreditCardOutlined, HomeOutlined, LinkOutlined} from "@ant-design/icons";
import {usePathname, useRouter} from 'next/navigation'
import {Auth0Provider} from "@auth0/auth0-react";
import UserMenuButton from "@/app/user_menu_button";
import MoreUserInfoProvider from "@/app/components/more_user_info_provider";


export default function LayoutClient({
                                         children,
                                     }: {
    children: React.ReactNode
}) {


    const items: MenuProps['items'] = [
        {
            label: 'Accueil',
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
    const [origin, setOrigin] = useState<string|undefined>()
    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])
    return <>{!origin ? <Skeleton active={true} />:
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: origin,
            }}
        >
            <MoreUserInfoProvider>
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
                        <Col>
                            <UserMenuButton />
                        </Col>
                    </Row>
                </Header>

                <Content style={{ padding: '4px 4px' }}>
        {children}
                </Content>
                <Footer></Footer>
            </Layout>
    </ConfigProvider>
            </MoreUserInfoProvider>
        </Auth0Provider>}
    </>
}