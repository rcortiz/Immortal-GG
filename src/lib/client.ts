"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  const isServer = typeof window === "undefined";

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api.stratz.com/graphiql",
      headers: isServer
        ? {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`,
            "User-Agent": "STRATZ_API",
          }
        : {},
    }),
  });
});
