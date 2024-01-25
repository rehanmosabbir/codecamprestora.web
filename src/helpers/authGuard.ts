import { roles } from "./roles";
import { JWT } from "next-auth/jwt";
import { allEndpoints } from "./endpoints";
import { AuthGuradResult } from "@/types/auth";
import { NextResponse, URLPattern } from "next/server";

const isInRole = (desiredRole: string, userRoles: string[]): boolean => {
  return userRoles.some((role) => role.toLowerCase() === desiredRole);
};

const wantsToVisitOwnerPage = (pathTo: string, pathFrom: string): boolean => {
  const endpoints = allEndpoints();

  const patterns = endpoints.ownerPaths.map(path => {
    const isDynamicPath = path.includes('*') || path.endsWith('*');
    const isStaticPath = !path.endsWith('/') && !path.endsWith('*') && !isDynamicPath;

    if(isStaticPath) {
      const pattern = `^${path}$`;
      return new RegExp(pattern);
    }

    if(isDynamicPath) {
      const pattern = path.replaceAll('*', '.*');
      return new RegExp(pattern);
    }
  });


  const matched = patterns.some(pattern => {
    if(pattern === undefined) return false;
    return pattern.test(pathTo);
  });

  return matched ? true : false;
};

const wantsToVisitManagerPage = (pathTo: string, pathFrom: string): boolean => {
  const endpoints = allEndpoints();

  const patterns = endpoints.managerPaths.map(path => {
    const isDynamicPath = path.includes('*') || path.endsWith('*');
    const isStaticPath = !path.endsWith('/') && !path.endsWith('*') && !isDynamicPath;

    if(isStaticPath) {
      const pattern = `^${path}$`;
      return new RegExp(pattern);
    }

    if(isDynamicPath) {
      const pattern = path.replaceAll('*', '.*');
      return new RegExp(pattern);
    }
  });

  const matched = patterns.some(pattern => {
    if(pattern === undefined) return false;
    return pattern.test(pathTo);
  });

  return matched ? true : false;
};

const handleRoles = (
  token: JWT,
  currentPath: string,
  baseURL: string
): AuthGuradResult => {
  console.log("here...");
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
    if (isManager) return { isRedirected: false };

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
