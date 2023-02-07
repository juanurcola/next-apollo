import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/user") || req.nextUrl.pathname.startsWith("/sale")) {
    const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!)!;

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      await jwtVerify(token.value, secret);

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")) {
    const token = req.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!);

    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (process.env.NODE_ENV === "production") {
    const basicAuth = req.headers.get("authorization");
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, password] = atob(authValue).split(":");

      if (user === "admin" && password === "admin") {
        return NextResponse.next();
      }
    }
    url.pathname = "/api/auth";

    return NextResponse.rewrite(url);
  }
}
