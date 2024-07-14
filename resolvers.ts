import Article from "./model/article.model";

export const resolvers = {
    Query: {
      hello: () => {
        return "xin chào";
      },
      getListArticle: async ()=>{
        const articles = await Article.find({
            deleted: false,
        });

        return articles;
      },
      getAricle: async (_, args)=>{
        const { id } = args;

        const article = await Article.findOne({
            _id: id,
            deleted: false,
        });

        return article;
      },
    },

    Mutation: {
        createArticle: async (_, args)=>{
            const  { article } = args;

            const record = new Article(article);
            await record.save();

            return record;
        }
    }
  };
