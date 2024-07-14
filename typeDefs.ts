import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Category {
        id: ID,
        title: String,
        avatar: String,
    }

    type Query {              
        hello: String,
        getListArticle: [Article],
        getAricle(id: ID): Article,

        getListCategory: [Category],
        getCategory(id: ID): Category,
    }
    
    input articleInput {
        title: String,
        avatar: String,
        description: String
    }

    type Mutation {             
        createArticle(article: articleInput): Article
        deleteArticle(id: ID): String,
        updateArticle(id: ID, article: articleInput): Article
    }
`;