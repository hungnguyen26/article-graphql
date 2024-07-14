import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import {  ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"
 
const startSever = async () => {
  dotenv.config();

  database.connect();

  const app: Express = express();
  const port: number | String = process.env.PORT || 3000;

  // // REST APi
  // app.get("/article", async (req: Request, res: Response) => {
  //     const articals = await Article.find({
  //         deleted:false
  //     })

  //     res.json({
  //         artical: articals
  //     })
  // });

  
  // GraphQL

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app: app,
    path: "/graphql",
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startSever();