import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isPublic = createRouteMatcher([
    '/sign-in',
    '/sign-up',
    '/',
])
const isPublicAPI = createRouteMatcher([
    '/api/videos',
   
])

export default clerkMiddleware(async (auth,req) => {
    const { userId } = await auth()
    const currentUrl = new URL(req.url)
    const isHome = currentUrl.pathname == '/home'
    const isApi = currentUrl.pathname.startsWith('/api')

    if(userId && isPublic(req) && !isHome){
        return NextResponse.redirect(new URL('/home',req.url))
    }

    if(!userId){
      if(!isPublicAPI(req) && !isPublic(req)){
        return NextResponse.redirect(new URL('/sign-in',req.url))
      }
      if(isApi && !isPublicAPI(req)){
        return NextResponse.redirect(new URL('/sign-in',req.url))
      }
    }
    
    return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
}