import { fetchAPI } from "@/app/utils/fetch-api";

export async function getPageBySlug(slug: string, lang: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  const path = `/pages`;
  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
      "gradientHero.seminarCard",
      "list",
      "seminarCard",
    ],
    encodeValuesOnly: true, // prettify URL
    filters: { slug },
    locale: lang,
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };

  return await fetchAPI(path, urlParamsObject, options);
}

/* [
      "list",
      "listElement",
      "listElements",
      "list.listElement",
      "list.listElements",
      "lists.listElement",
      "lists.listElements",
    ], */
