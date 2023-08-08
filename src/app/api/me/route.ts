import {NextRequest, NextResponse} from "next/server";
import {withApiAuth} from "@/utils/api_auth";

export const GET = withApiAuth(async (req: NextRequest, profile: any) => {
    const authorization = req.headers.get("authorization")
    return NextResponse.json({status: "OK", authorization: authorization})
})