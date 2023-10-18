import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const Token = async (req: NextRequest, res) => {
  const token = await getToken({ req });

  if (token) {
    console.log("JSON Web Token:", JSON.stringify(token, null, 2));
  } else {
    res.status(401);
  }
  res.end();
};

export { Token as GET };
