import { createDirectus, rest, graphql } from "@directus/sdk";
import { Schema } from "@/schema";

const directus = createDirectus<Schema>("http://localhost:8055")
  .with(
    rest({
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  )
  .with(graphql());

export default directus;
