import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const publicRoutes = [
    {
        path: '/sign-in',
        whenAuthenticated: 'redirect',
    },
    {
        path: '/produtos',
        whenAuthenticated: 'next'
    }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/sign-in'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('token')

    if(path === '/') {
        const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

        return NextResponse.redirect(redirectUrl)
    }

    // if(!authToken && publicRoute) {
    //     return NextResponse.next()
    // }

    // if(!authToken && !publicRoute) {
    //     const redirectUrl = request.nextUrl.clone()

    //     redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    //     return NextResponse.redirect(redirectUrl)
    // }

    // if(authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect'){
    //     console.log('03')
    //     const redirectUrl = request.nextUrl.clone()
    //     redirectUrl.pathname = '/'
    //     return NextResponse.redirect(redirectUrl)
    // }

    if(authToken && !publicRoute) {
        console.log('04')
        // checar se o JWT não expirou
        // Se sim, remover o cookie e redirecionar o usuário para o login
        // Aplicar uma estratégia de refresh

        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [

        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}
