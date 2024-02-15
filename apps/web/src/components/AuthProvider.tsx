"use client";

import { SessionProvider } from "next-auth/react";


const AuthProvider = ({
    children,
    pageProps: { session},
  }: {
    children: React.ReactNode,
    pageProps:any
  }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;