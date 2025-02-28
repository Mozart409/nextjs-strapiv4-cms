/**
 * This file was automatically generated by Strapi.
 * Any modifications made will be discarded.
 */
import graphql from "@strapi/plugin-graphql/strapi-admin";
import i18N from "@strapi/plugin-i18n/strapi-admin";
import seo from "@strapi/plugin-seo/strapi-admin";
import usersPermissions from "@strapi/plugin-users-permissions/strapi-admin";
import { renderAdmin } from "@strapi/strapi/admin";
import requestId from "strapi-plugin-request-id/strapi-admin";
import restCache from "strapi-plugin-rest-cache/strapi-admin";

renderAdmin(document.getElementById("strapi"), {
  plugins: {
    graphql: graphql,
    i18n: i18N,
    seo: seo,
    "users-permissions": usersPermissions,
    "request-id": requestId,
    "rest-cache": restCache,
  },
});
