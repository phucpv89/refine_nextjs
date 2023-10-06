import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import apiInstance from "./apiInstance";

import qs from "qs";

const mockUsers = [
  {
    name: "John Doe",
    email: "johndoe@mail.com",
    roles: ["admin"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Doe",
    email: "janedoe@mail.com",
    roles: ["editor"],
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];

export const authProvider: AuthBindings = {
  login: async ({ email, username, password, remember }) => {
    // Suppose we actually send a request to the back end here.
    console.log("login");
    const user = mockUsers[0];

    try {
      const resp = await apiInstance.post("/auth/login", {
        password: password,
        email: email,
      });

      const { data, code } = resp as any;
      if (code === 1 && data) {
        nookies.set(null, "auth", JSON.stringify(data), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        return {
          success: true,
          redirectTo: "/",
        };
      }

      console.log("login", resp);
    } catch (error) {
      console.log("login error", error);
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    console.log("logout");
    nookies.destroy(null, "auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async (ctx: any) => {
    console.log("check", ctx);
    const cookies = nookies.get(ctx);
    if (cookies["auth"]) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => {
    console.log("getPermissions");
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    console.log("getIdentity");
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    console.log("onError");
    console.error(error);
    return { error };
  },
  register: async (params: any) => {
    console.log(">>>>>>>>>>>>>>", params);
    const { email, password } = params;


    const name = email.replace(/(.*)@.*/, "$1")

    try {
      const resp = await apiInstance.post(
        "/auth/register",
        qs.stringify({
          email,
          password,
          name: name,
        }),
        {
          headers: { "content-type": "application/x-www-form-urlencoded" },
        },
      );
      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Signup Error",
          message: "username or password",
        },
      };
    }
  },
  forgotPassword: async () => {
    return {
      success: true,
      redirectTo: "/",
    };
  },

  // register?: (params: any) => Promise<AuthActionResponse>;
  //   forgotPassword?: (params: any) => Promise<AuthActionResponse>;
  //   updatePassword?: (params: any) => Promise<AuthActionResponse>;
};
/* export type AuthActionResponse = {
  success: boolean;
  redirectTo?: string;
  error?: RefineError | Error;
  [key: string]: unknown;
}; */
