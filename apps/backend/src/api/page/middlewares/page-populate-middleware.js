"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
	contentSections: {
		populate: {
			picture: {
				fields: ["url", "alternativeText", "caption", "width", "height"],
			},
			buttons: {
				populate: true,
			},
			image: {
				fields: ["url", "alternativeText", "caption", "width", "height"],
			},
			feature: {
				populate: {
					fields: ["title", "description", "showLink", "newTab", "url", "text"],
					media: {
						fields: ["url", "alternativeText", "caption", "width", "height"],
					},
				},
			},
			testimonials: {
				populate: {
					picture: {
						fields: ["url", "alternativeText", "caption", "width", "height"],
					},
				},
			},
			plans: {
				populate: ["product_features"],
			},
			submitButton: {
				populate: true,
			},
			list: {
				populate: true,
			},
			listElement: {
				populate: true,
			},
			seminarCard: {
				populate: {
					image: {
						fields: ["url", "alternativeText", "caption", "width", "height"],
					},
				},
			},
			richText: {
				populate: true,
			},
			features: {
				populate: {
					media: true,
					link: true,
				},
			},
			featuresGroup: {
				populate: {
					features: {
						populate: {
							media: true,
							link: true,
						},
					},
				},
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
		ctx.query = {
			populate,
			filters: { slug: ctx.query.filters.slug },
			locale: ctx.query.locale,
		};

		//  console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

		await next();
	};
};
