'use client'
import {useMoreUser} from "@/app/components/use_more_user";
import {useContext} from "react";
import {MoreUserInfoContext} from "@/app/components/more_user_info_context";
import {Spin} from "antd";
import SubComponent from "@/app/test/sub_component";

export default function Page() {
    const authContext = useContext(MoreUserInfoContext)
    return <>
        {authContext.isLoading && <Spin />}
        <ul>
            <li>isAuthenticated: {authContext.isAuthenticated ? "yes" : "no"}</li>
            <li>isLoading: {authContext.isLoading ? "yes" : "no"}</li>
            <li>isCached: {authContext.isCached ? "yes" : "no"}</li>
            <li>status: {authContext.status}</li>
        </ul>
        <SubComponent />
    </>
}