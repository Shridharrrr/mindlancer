import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublic = createRouteMatcher(["/sign-in", "/sign-up", "/job-post"]);
const isPublicAPI = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth,req) => {
    const { userId } = await auth()
    const currentUrl = new URL(req.url)
    const isHome = currentUrl.pathname == '/'
    const isApi = currentUrl.pathname.startsWith('/api')

    if(userId && isPublic(req) && !isHome){
        return NextResponse.redirect(new URL('/',req.url))
    }
    if (isApi && !isPublicAPI(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();

  }

);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
