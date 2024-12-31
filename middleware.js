import { NextResponse } from "next/server";

export const middleware = (req, res) => {
  const { cookies, url } = req;

  if (!url.includes("/auth/login") && cookies.has("login")) {
    return NextResponse.next();
  } else if (!cookies.has("login") && !url.includes("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
};

// htaccess benzeri bir config dosyası
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"]
};
