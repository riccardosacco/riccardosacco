"use client";

import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const inter_tight = Inter_Tight({ subsets: ["latin"] });

const client = new ApolloClient({
  uri: "http://localhost:8055/graphql",
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={inter_tight.className}>{children}</body>
      </html>
    </ApolloProvider>
  );
}
