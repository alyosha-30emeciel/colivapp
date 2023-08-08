import {useContext} from "react";
import {MoreUserInfoContext} from "@/app/components/more_user_info_context";
import useSWR from "swr";

export default function SubComponent() {
    const moreUserInfoContext = useContext(MoreUserInfoContext)
    const {data: userInfo} = useSWR("/api/me")
    return <>
        isCached: {moreUserInfoContext.isCached ? "yes" : "no"}
        data: {userInfo?.status}
    </>
}