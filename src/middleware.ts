import { getSession } from '@auth0/nextjs-auth0/edge';
import next from 'next';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    if (pathname === "/") return NextResponse.next(); // Allow access to public routes

    const sensitiveRoutes = ["/dashboard", "/chat", "/assmt"]; // Add more routes as needed
    const isLogin = pathname === "/api/auth/login";
    const isSignUp = pathname === "/api/auth/signup";
    const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) => pathname.startsWith(route));
 
    const session = await getSession();
    if (!session && isLogin) {
        return NextResponse.next(); // Allow access to login route
    }
    else if (!session && isSignUp) {
        return NextResponse.next(); // Allow access to signup route
    }
    else if (!session) {
        return NextResponse.redirect(new URL("/api/auth/login", req.nextUrl.origin));
    }

    const user = session?.user;

    if (user) {
        if (isLogin || isSignUp)
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin + "/dashboard"));
        else if (isAccessingSensitiveRoutes)
            return NextResponse.next(); // Allow access to sensitive routes
    } else {
        if (isAccessingSensitiveRoutes) 
            return NextResponse.redirect(new URL("/api/auth/login", req.nextUrl.origin));
    }

    return NextResponse.next(); // Allow access to public routes
}

export const config = {
    matcher: ["/", "/assmt/:path", "/chat/:path", "/dashboard/:path*", "/api/auth/login", "/api/auth/signup"],
};
