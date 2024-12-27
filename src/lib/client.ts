"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: "https://api.stratz.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.STRATZ_API_KEY}`,
    "User-Agent": "STRATZ_API",
  },
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]),
  });
});
