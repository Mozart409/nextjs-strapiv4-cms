module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      landingPage: false,
      depthLimit: 12,
      amountLimit: 100,
      apolloServer: {
        tracing: true,
      },
    },
  },
});
