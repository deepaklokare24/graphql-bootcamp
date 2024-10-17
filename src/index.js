import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import fs from "fs";
import path from "path";
import db from "./db.js";
import Query from "./resolvers/Query.js";
import Post from "./resolvers/Post.js";
import User from "./resolvers/User.js";
import Comment from "./resolvers/Comment.js";
import Mutation from "./resolvers/Mutation.js";

const __dirname = path.resolve();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      path.join(__dirname, "src", "schema.graphql"),
      "utf-8"
    ),
    resolvers: {
      Query,
      Post,
      User,
      Comment,
      Mutation,
    },
  }),
  context: () => {
    return { db };
  },
});

const server = createServer(yoga);

server.listen({ port: 4000 }, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
