import {NextResponse} from "next/server";
import type {NextRequest} from 'next/server'

export async function middleware(request){
    // const response = NextResponse.next()
    // const locale = request.cookies.get('locale')?.value || 'uk'
    console.log('lol')
    return NextResponse.next()
    // return NextResponse.redirect(new URL('/posts', request.url))
}
