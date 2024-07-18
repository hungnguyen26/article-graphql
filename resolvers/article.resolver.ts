import Article from "../model/article.model";
import Category from "../model/categories.model";

export const resolversArticle = {
    Query: {
      hello: () => {
        return "xin chào";
      },
      getListArticle: async (_, args)=>{
        const { sortKey , sortValue , currentPage , limitItem, filterKey, filterValue} = args;

        const find = {
            deleted: false,
        }

        // sort
        const sort = {};
        if( sortKey && sortValue){
            sort[sortKey] = sortValue;
        }
        // end sort

        // phân trang 
        const skip = (currentPage - 1) * limitItem;             // công thức bỏ qua bnhiu phần tử
        // end phân trang 


        // bộ lọc
        if(filterKey && filterValue){
            find[filterKey] = filterValue;
        }
        // end bộ lọc

        const articles = await Article.find(find).sort(sort).limit(limitItem).skip(skip);

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

    Article: {
        category: async (article)=>{
            const categoryId = article.categoryId;

            const category = await Category.findOne({
                _id:categoryId
            })

            return category;
        }
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

    }
  };
