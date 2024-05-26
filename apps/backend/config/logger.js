const { winston } = require("@strapi/logger");

module.exports = {
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.json(),
      ),
    }),
  ],
};
