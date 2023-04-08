import { NextRequest, NextResponse } from 'next/server'
export async function middleware(req:NextRequest) {
    const { nextUrl, cookies } = req
    //@ts-ignore
    const userLocale = cookies.get('NEXT_LOCALE')
    const defaultLocale = nextUrl.defaultLocale
    const locale = nextUrl.locale
    const pathname = nextUrl.pathname

    if(!userLocale){
        const response = NextResponse.redirect(new URL(`/${locale || defaultLocale}${pathname}`, req.url))
        //@ts-ignore

        response.cookies.set('NEXT_LOCALE', locale || (defaultLocale as string))
        return response
    }
}


// const response = NextResponse.redirect(new URL(`/${locale || defaultLocale}${pathname}`, req.url))
// response.cookies.set('NEXT_LOCALE', locale || (defaultLocale as string))
// return response