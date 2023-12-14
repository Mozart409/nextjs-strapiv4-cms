module.exports = ({ env }) => ({
  // TODO: add s3 provider and sendmail provider
  seo: {
    enabled: true,
  },
  "request-id": {
    enabled: true,
  },
  graphql: {
    enabled: true,
    config: {
      // set this to true if you want to enable the playground in production
      playgroundAlways: false,
    },
  },
  redis: {
    config: {
      connections: {
        default: {
          connection: {
            host: env("REDIS_HOST", "127.0.0.1"),
            port: env("REDIS_PORT", 6379),
            db: 0,
            username: "default",
            password: env("REDIS_PASSWORD", ""),
          },
          settings: {
            debug: true,
          },
        },
      },
    },
  },
  "rest-cache": {
    config: {
      provider: {
        name: "redis",
        options: {
          max: 32767,
          connection: "default",
        },
      },
      strategy: {
        // if you are using keyPrefix for your Redis, please add <keysPrefix>
        keysPrefix: "strapi",
        contentTypes: [
          // list of Content-Types UID to cache
          "api::category.category",
          "api::article.article",
          "api::global.global",
          "api::page.page",
        ],
      },
    },
  },
});
