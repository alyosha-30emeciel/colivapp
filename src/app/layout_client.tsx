"use client"
import {ConfigProvider} from "antd";



export default function LayoutClient({
                                         children,
                                     }: {
    children: React.ReactNode
}) {



    return <>
        <ConfigProvider
            theme={{ token: {  borderRadius: 6,
                colorPrimary: '#b217ff' } }}>
        {children}
    </ConfigProvider>
    </>
}