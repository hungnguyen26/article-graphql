import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import Article from "./model/article.model";

dotenv.config();

database.connect();

const app: Express = express();
const port: number | String = process.env.PORT || 3000;


// REST APi
app.get("/article", async (req: Request, res: Response) => {
    const articals = await Article.find({
        deleted:false
    })

    res.json({
        artical: articals
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
