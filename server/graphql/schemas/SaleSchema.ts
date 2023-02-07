export default `
  type Sale {
    _id: ID
    slug: String
    title: String
  }

  type Query {
    getSales: [Sale!]
    getSaleSlug(slug: String!): Sale
  }

`;
