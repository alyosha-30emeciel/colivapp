import {createContext} from "react";

export interface MoreUserInfoContextType {
    isLoading: boolean,
    isAuthenticated: boolean,
    isCached: boolean,
    status?: string,
    name?: string,
}
export const MoreUserInfoContext = createContext<MoreUserInfoContextType>({
    isLoading: true,
    isAuthenticated: false,
    isCached: false,
})
