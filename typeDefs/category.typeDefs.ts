import { gql } from "apollo-server-express";

export const typeDefsCategory = gql`

    type Category {
        id: ID,
        title: String,
        avatar: String,
    }

    type Query {              
        getListCategory: [Category],
        getCategory(id: ID): Category,
    }


    input categoryInput {
        title: String,
        avatar: String,
    }

    type Mutation {             
        createCategory(category: categoryInput): Category
        deleteCategory(id: ID): String,
        updateCategory(id: ID, category: categoryInput): Category


    }
`;