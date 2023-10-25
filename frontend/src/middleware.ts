import { withAuth } from "next-auth/middleware";
import { RoleList } from "./utils/roleList";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.user.role === RoleList.ADMIN;
      },
    },
  }
);

export const config = { matcher: ["/dashboard"] };
