"use client";

import { ApolloLink, HttpLink, NormalizedCacheObject } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: "https://api.stratz.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`,
      "User-Agent": "STRATZ_API",
    },
  });

  return new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
