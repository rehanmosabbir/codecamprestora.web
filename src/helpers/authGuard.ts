import { roles } from "./roles";
import { JWT } from "next-auth/jwt";
import { allEndpoints } from "./endpoints";
import { AuthGuradResult } from "@/types/auth";
import { NextResponse, URLPattern } from "next/server";

const isInRole = (desiredRole: string, userRoles: string[]): boolean => {
  return userRoles.some((role) => role.toLowerCase() === desiredRole);
};

const wantsToVisitOwnerPage = (path: string, basePath: string): boolean => {
  const endpoints = allEndpoints();

  const ownerPathPatterns = endpoints.ownerPaths.map(
    (path) => new URLPattern(path, basePath)
  );
  var isMatched = ownerPathPatterns.some((pattern) => pattern.test(basePath));

  return isMatched ? true : false;
};

const wantsToVisitManagerPage = (path: string, basePath: string): boolean => {
  const endpoints = allEndpoints();

  const managerPathPatterns = endpoints.managerPaths.map(
    (path) => new URLPattern(path, basePath)
  );
  var isMatched = managerPathPatterns.some((pattern) => pattern.test(basePath));

  return isMatched ? true : false;
};

const handleRoles = (
  token: JWT,
  currentPath: string,
  baseURL: string
): AuthGuradResult => {
    if (wantsToVisitOwnerPage(currentPath, baseURL)) {
    const isAdmin = isInRole(roles.Owner, token.roles);
    if (isAdmin) return { isRedirected: false };

    return {
        isRedirected: true,
        response: NextResponse.redirect(new URL("/", baseURL)),
    };
  }

  if (wantsToVisitManagerPage(currentPath, baseURL)) {
    const isManager = isInRole(roles.Manager, token.roles);
    if(isManager) return { isRedirected: false };

    return {
        isRedirected: true,
        response: NextResponse.redirect(new URL("/", baseURL)),
    };
  }

  return { isRedirected: false };
};

export const redirectIfGuarderRoute = (
  token: JWT,
  pathTo: string,
  pathFrom: string
): AuthGuradResult => {
  if (pathTo.startsWith("/registration") || pathTo.startsWith("/login")) {
    return {
      isRedirected: true,
      response: NextResponse.redirect(new URL("/", pathFrom)),
    };
  }

  return handleRoles(token, pathTo, pathFrom);
};
