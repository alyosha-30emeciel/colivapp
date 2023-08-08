import {NextRequest, NextResponse} from "next/server";
import {createRemoteJWKSet, jwtVerify} from "jose";


const JWKS = createRemoteJWKSet(new URL(process.env.AUTH0_JWKS!))

function get401() {
    return NextResponse.json(
        {
            error: 'not_authenticated',
            description: 'The user does not have an active session or is not authenticated'
        },
        {status: 401}
    );
}
export function withApiAuth(fct: (request:NextRequest, profile: any) => Promise<NextResponse>) {
    return async (request: NextRequest) => {
        const authorization = request.headers.get("authorization")
        if (!authorization || authorization.length < 8) {
            return get401()
        }
        // discard and remove "Bearer "
        const jwt = authorization.slice(7)
        const {payload, protectedHeader} = await jwtVerify(jwt, JWKS, {
            algorithms: ["RS256"],
        })

        const user_id = payload.sub
        if (!user_id) {
            return get401()
        }
/*        let auth = await prisma.auth.findFirst({
            where: {
                id: user_id,
            },
        })
        if (!auth) {
            // try to create auth and profile
            auth = await prisma.auth.create({
                data: {
                    id: user_id,
                    profile : {
                        create : {
                            email: "email@email.com",
                            display_name: "nickname",
                        }
                    }
                }
            })
        }
        const profile = await prisma.profile.findFirstOrThrow({where: {id: auth.profile_id}})
        */
        const profile = {}
        return fct(request, profile)
    }

}