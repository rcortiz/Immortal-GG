"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://api.stratz.com/graphiql",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`,
        "User-Agent": "STRATZ_API",
      },
    }),
  });
});

// "use client";

// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "https://api.stratz.com/graphiql",
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API_KEY}`,
//       "User-Agent": "STRATZ_API",
//     },
//   }),
// });

// export default client;
