import {MoreUserInfoContext, MoreUserInfoContextType} from "@/app/components/more_user_info_context";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import useSWR, {Key, SWRConfig} from "swr";





export default function MoreUserInfoProvider({
                                                 children,
                                             }: {
    children: React.ReactNode
}) {
    const { isLoading: isAuth0Loading, isAuthenticated : isAuth0Authenticated, error, user, getAccessTokenSilently} =
        useAuth0();
    const [isAccessTokenLoading, setIsAccessTokenLoading] = useState(false)
    const [accessToken, setAccessToken] = useState<string|undefined>()
    const [isCached, setIsCached] = useState(false)

    useEffect(()  => {
        if (accessToken) {
            setIsCached(true)
            return
        }
        setIsCached(false)
        if (!isAuth0Authenticated) {
            return
        }
        const abortController = new AbortController();
        setIsAccessTokenLoading(true);
        (async () => {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: 'colivapp-api',
                },
            })
            setIsAccessTokenLoading(false)
            setAccessToken(accessToken)
        })()

        return () => {
            setIsAccessTokenLoading(false)
            abortController.abort()
        }

    }, [accessToken, getAccessTokenSilently, isAuth0Authenticated, setIsAccessTokenLoading])

    const authenticating_fetcher = ([token, url]: [token: string, url: string]) => fetch(url, {headers: {authorization: `Bearer ${token}`}}).then(res => res.json())
    const {data: moreInfo, isLoading: isSWRLoading} = useSWR(accessToken && [accessToken, "/api/me"], authenticating_fetcher)
    const isLoading = isAuth0Loading || isAccessTokenLoading || isSWRLoading
    const isAuthenticated = !!accessToken && !!moreInfo

    const moreUserInfoContext = {
        isLoading: isLoading,
        isAuthenticated: isAuthenticated,
        isCached: isCached,
        status: moreInfo?.status,
        name: isAuthenticated ? user?.name :  undefined
    }
    function authenticatedSWRMiddleware(useSWRNext: any) {
        return (key: Key, fetcher: any, config: any) => {
            // Execute the hook with the new fetcher.
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useSWRNext([accessToken, key], authenticating_fetcher, config)
        }
    }

    return <>
        <MoreUserInfoContext.Provider value={moreUserInfoContext}>
            <SWRConfig value={{use: [authenticatedSWRMiddleware]}}>
                {children}
            </SWRConfig>
        </MoreUserInfoContext.Provider>
    </>

}