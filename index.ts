import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import {  ApolloServer, gql } from "apollo-server-express";
 
import { typeDefsArticle } from "./typeDefs/article.typeDefs"
import { typeDefsCategory } from "./typeDefs/category.typeDefs"
import { resolversArticle } from "./resolvers/article.resolver"
import { resolversCategory } from "./resolvers/category.resolver"
 
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
    typeDefs:  [typeDefsArticle, typeDefsCategory],
    resolvers: [resolversArticle, resolversCategory]
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