module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  "request-id": {
    enabled: true,
  },
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET"),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM_EMAIL"),
        defaultReplyTo: env("DEFAULT_REPLAY_EMAIL"),
      },
    },
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
