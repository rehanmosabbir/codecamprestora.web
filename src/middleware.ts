import { getToken } from "next-auth/jwt";
import { NextFetchEvent } from "next/server";
import { redirectIfGuarderRoute } from "./helpers/authGuard";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { useIsFetching } from "react-query";

export default async function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  const pathTo = req.nextUrl.pathname;
  const pathFrom = req.url;

  if(isAuthenticated)
  {
    var result = redirectIfGuarderRoute(token, pathTo, pathFrom);
    if(result.isRedirected) return result.response;
  }

  if(!isAuthenticated && pathTo.startsWith("/registration")) return;

  const authMiddleware = withAuth({
    pages: {
      signIn: '/login',
    },
  });

  return authMiddleware(req, event);
}
