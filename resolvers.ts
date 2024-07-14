import Article from "./model/article.model";
import Category from "./model/categories.model";

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

      getListCategory: async ()=>{
        const category = await Category.find({
            deleted: false,
        });

        return category;
      },
      getCategory: async (_, args)=>{
        const { id } = args;

        const category = await Category.findOne({
            _id: id,
            deleted: false,
        });

        return category;
      },
    },

    Mutation: {
        createArticle: async (_, args)=>{
            const  { article } = args;

            const record = new Article(article);
            await record.save();

            return record;
        },

        deleteArticle: async (_,args)=>{
            const { id } = args;

            await Article.updateOne({
                _id:id
            },{
                deleted:true,
                deletedAt: new Date()
            })

            return "Đã xóa";
        },
        
        updateArticle: async (_,args)=>{
            const { id , article } = args;

            await Article.updateOne({
                _id:id
            },article)

            const record = await Article.findOne({
                _id:id
            })

            return record;
        },


        createCategory: async (_, args)=>{
            const  { category } = args;

            const record = new Category(category);
            await record.save();

            return record;
        },
        updateCategory: async (_,args)=>{
            const { id , category } = args;

            await Category.updateOne({
                _id:id
            },category)

            const record = await Category.findOne({
                _id:id
            })

            return record;
        },
        deleteCategory: async (_,args)=>{
            const { id } = args;

            await Category.updateOne({
                _id:id
            },{
                deleted:true,
                deletedAt: new Date()
            })

            return "Đã xóa";
        },
        
    }
  };
