/** Config for VSCode plugin: GraphQL: Language Feature Support */
require("dotenv").config();

const endpoint = process.env.ENDPOINT;
const token = process.env.TOKEN;

module.exports = {
  projects: {
    app: {
      schema: [
        {
          [endpoint]: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      ],
      documents: [
        "src/gql-operations/*.graphql",
        "src/**/*.ts",
        // Warning! Glob matching a large project might have a big negative impact on IDE performance
        // "src/**/*.{graphql,ts,tsx}",
      ],
    },
  },
};
