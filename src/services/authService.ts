import axios from "axios";
import { JWT } from "next-auth/jwt";
import { AuthResult, LoginCredential } from "@/types/auth";

export const login = async (
  loginCredential: LoginCredential
): Promise<AuthResult> => {
  var result = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/owners/login`,
    loginCredential
  );
  var data = result.data;

  return data;
};

export const refreshToken = async (token: JWT): Promise<AuthResult> => {
  var result = await axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/owners/refresh`, {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    })
    .then((result) => result.data)
    .catch((error) => null);

  // var data = result.data;
  // return data;
  return result;
};

export const isTokenExpired = (token: JWT): boolean => {
  var expiryDate = new Date(token.expiresIn);

  var expiryInMiliSec = expiryDate.getTime();
  var nowInMiliSec = Date.now();

  console.log(expiryInMiliSec, nowInMiliSec);

  if (expiryInMiliSec < nowInMiliSec) {
    return true;
  }

  return false;
};
