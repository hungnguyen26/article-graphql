import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

// REST APi
app.get("/artical", (req: Request, res: Response) => {
    res.json({
        artical: []
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
