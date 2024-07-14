import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }

    type Query {              
        hello: String,
        getListArticle: [Article],
        getAricle(id: ID): Article
    }
    
    input articleInput {
        title: String,
        avatar: String,
        description: String
    }

    type Mutation {             
        createArticle(article: articleInput): Article
        deleteArticle(id: ID): String
    }
`;