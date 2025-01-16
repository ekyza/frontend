import { useCookies } from "react-cookie";

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  return {
    cookies,
    setCookie,
    removeCookie,
  };
};
