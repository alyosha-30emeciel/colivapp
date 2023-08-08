import {useAuth0} from "@auth0/auth0-react";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Dropdown, MenuProps, Space, Spin} from "antd";
import {router} from "next/client";
import {useContext, useState} from "react";
import {MoreUserInfoContext} from "@/app/components/more_user_info_context";

export default function UserMenuButton() {
    const { loginWithRedirect, logout } =
        useAuth0();
    const moreUserInfoContext = useContext(MoreUserInfoContext)
    const [isActionLoading, setIsActionLoading] = useState(false)
    const items: MenuProps['items'] = [
        {
            label: 'Logout',
            key: 'logout',
            icon: <UserOutlined />,
            danger: true,
        },
    ]

    const handleLoginClick = () => {
        setIsActionLoading(true)
        loginWithRedirect().then(r => setIsActionLoading(false))
    }
    const handleLogoutClick: MenuProps['onClick'] = (e) => {
        setIsActionLoading(true)
        logout({logoutParams: {returnTo: window.location.origin}}).then(r =>setIsActionLoading(false))
    }

    const menuProps = {
        items,
        onClick: handleLogoutClick,
    }

    if (moreUserInfoContext.isLoading) {
        return <><Spin /></>
    }

    if (!moreUserInfoContext.isAuthenticated) {
        return <>
            <Button loading={isActionLoading} type="primary" icon={<UserOutlined />} onClick={handleLoginClick}>
                <Space>
                    Connection
                </Space>
            </Button>
        </>
    }

    return <>
        <Dropdown menu={menuProps} trigger={['click']}>
            <Button loading={isActionLoading} type="primary" icon={<UserOutlined />}>
                <Space>
                    {moreUserInfoContext?.name}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    </>
}