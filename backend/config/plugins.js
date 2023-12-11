module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  graphql: {
    enabled: true,
    config: {
      // set this to true if you want to enable the playground in production
      playgroundAlways: false,
    },
  },
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 7, // Default is 5
    },
  },
});
