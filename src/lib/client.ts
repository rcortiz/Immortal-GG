"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

// const errorLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map((response) => {
//     if (response.errors) {
//       console.error("GraphQL Errors:", response.errors);
//     }
//     return response;
//   });
// });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: "https://api.stratz.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`,
    "User-Agent": "STRATZ_API",
  },
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]),
  });
});
