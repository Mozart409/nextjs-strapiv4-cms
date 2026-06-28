/**
 * `page-populate-middleware` middleware
 *
 * Strapi v5: relations/media inside a dynamic zone (polymorphic structure)
 * cannot be targeted with a generic `populate` object. They must be populated
 * per-component through the fragment API (`on`). See:
 * https://docs.strapi.io/dev-docs/api/rest/populate-select#populate-fragments
 */

const populate = {
  contentSections: {
    on: {
      "sections.bottom-actions": { populate: { buttons: true } },
      "sections.dangerous-html": { populate: true },
      "sections.dynamic-content": { populate: true },
      "sections.feature-columns-group": {
        populate: { features: { populate: { icon: true } } },
      },
      "sections.feature-rows-group": {
        populate: { features: { populate: { media: true, link: true } } },
      },
      "sections.features": {
        populate: { feature: { populate: { media: true } } },
      },
      "sections.gradient-hero": {
        populate: { seminarCard: { populate: { image: true } } },
      },
      "sections.heading": { populate: true },
      "sections.hero": { populate: { picture: true, buttons: true } },
      "sections.image": { populate: { picture: true, link: true } },
      "sections.large-video": { populate: { video: true, poster: true } },
      "sections.lead-form": { populate: { submitButton: true } },
      "sections.list": { populate: { listElement: true } },
      "sections.pricing": {
        populate: { plans: { populate: { product_features: true } } },
      },
      "sections.rich-text": { populate: true },
      "sections.seminar-group": {
        populate: { seminarCard: { populate: { image: true } } },
      },
      "sections.testimonials-group": {
        populate: { testimonials: { populate: { picture: true } } },
      },
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  },
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { filters, locale } = ctx.query;

    ctx.query = {
      populate,
      // Preserve the slug filter only when it was actually sent; calling
      // /api/pages with no filters must not crash (was: `filters.slug` on undefined).
      ...(filters?.slug ? { filters: { slug: filters.slug } } : {}),
      ...(locale ? { locale } : {}),
    };

    await next();
  };
};
