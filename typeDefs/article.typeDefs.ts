import { gql } from "apollo-server-express";

export const typeDefsArticle = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String,
        category: Category
    }

    type Query {              
        hello: String,
        getListArticle(
            sortKey: String, 
            sortValue: String, 
            currentPage: Int = 1, 
            limitItem:Int = 2,
            filterKey: String,
            filterValue: String,
            key: String
        ): [Article],
        getAricle(id: ID): Article,
    }
    
    input articleInput {
        title: String,
        avatar: String,
        description: String,
        categoryId: String  
    }

    type Mutation {             
        createArticle(article: articleInput): Article
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: articleInput): Article
    }
`;