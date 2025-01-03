import type { Attribute, Schema } from "@strapi/strapi";

export interface ElementsCheckboxRow extends Schema.Component {
  collectionName: "components_elements_checkbox_rows";
  info: {
    displayName: "CheckboxRow";
  };
  attributes: {
    value: Attribute.String & Attribute.Required;
    label: Attribute.String & Attribute.Required;
  };
}

export interface ElementsFeatureColumn extends Schema.Component {
  collectionName: "components_slices_feature_columns";
  info: {
    name: "FeatureColumn";
    displayName: "Feature column";
    icon: "align-center";
    description: "";
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media<"images"> & Attribute.Required;
  };
}

export interface ElementsFeatureRow extends Schema.Component {
  collectionName: "components_slices_feature_rows";
  info: {
    name: "FeatureRow";
    displayName: "Feature row";
    icon: "arrows-alt-h";
    description: "";
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    media: Attribute.Media<"images" | "videos"> & Attribute.Required;
    link: Attribute.Component<"links.link">;
  };
}

export interface ElementsFeature extends Schema.Component {
  collectionName: "components_elements_features";
  info: {
    displayName: "Feature";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media<"images" | "files" | "videos" | "audios">;
    showLink: Attribute.Boolean & Attribute.DefaultTo<false>;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    url: Attribute.String;
    text: Attribute.String;
  };
}

export interface ElementsFooterSection extends Schema.Component {
  collectionName: "components_links_footer_sections";
  info: {
    name: "FooterSection";
    displayName: "Footer section";
    icon: "chevron-circle-down";
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<"links.link", true>;
  };
}

export interface ElementsListElement extends Schema.Component {
  collectionName: "components_elements_list_elements";
  info: {
    displayName: "List Element";
    description: "";
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText & Attribute.Required;
  };
}

export interface ElementsLogos extends Schema.Component {
  collectionName: "components_elements_logos";
  info: {
    name: "logos";
    displayName: "Logos";
    icon: "apple-alt";
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media<"images">;
  };
}

export interface ElementsNotificationBanner extends Schema.Component {
  collectionName: "components_elements_notification_banners";
  info: {
    name: "NotificationBanner";
    displayName: "Notification banner";
    icon: "exclamation";
    description: "";
  };
  attributes: {
    type:
      & Attribute.Enumeration<["alert", "info", "warning"]>
      & Attribute.Required
      & Attribute.DefaultTo<"alert">;
    heading: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    show: Attribute.Boolean & Attribute.DefaultTo<false>;
    link: Attribute.Component<"links.link">;
  };
}

export interface ElementsPlan extends Schema.Component {
  collectionName: "components_elements_plans";
  info: {
    name: "plan";
    displayName: "Pricing plan";
    icon: "search-dollar";
    description: "";
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    isRecommended: Attribute.Boolean;
    price: Attribute.Decimal;
    pricePeriod: Attribute.String;
    product_features: Attribute.Relation<
      "elements.plan",
      "oneToMany",
      "api::product-feature.product-feature"
    >;
  };
}

export interface ElementsRichTextSelector extends Schema.Component {
  collectionName: "components_elements_rich_text_selectors";
  info: {
    displayName: "RichTextSelector";
    description: "";
  };
  attributes: {};
}

export interface ElementsSeminarCard extends Schema.Component {
  collectionName: "components_elements_seminar_cards";
  info: {
    displayName: "SeminarCard";
    description: "A single card describing a seminar";
  };
  attributes: {
    tilte: Attribute.String & Attribute.Required;
    text: Attribute.String;
    category: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    image: Attribute.Media<"images"> & Attribute.Required;
  };
}

export interface ElementsTestimonial extends Schema.Component {
  collectionName: "components_slices_testimonials";
  info: {
    name: "Testimonial";
    displayName: "Testimonial";
    icon: "user-check";
    description: "";
  };
  attributes: {
    picture: Attribute.Media<"images"> & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    authorName: Attribute.String & Attribute.Required;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: "components_layout_footers";
  info: {
    displayName: "Footer";
    description: "";
  };
  attributes: {
    footerLogo: Attribute.Component<"layout.logo">;
    menuLinks: Attribute.Component<"links.link", true>;
    legalLinks: Attribute.Component<"links.link", true>;
    socialLinks: Attribute.Component<"links.social-link", true>;
    categories: Attribute.Relation<
      "layout.footer",
      "oneToMany",
      "api::category.category"
    >;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: "components_layout_logos";
  info: {
    displayName: "Logo";
    description: "";
  };
  attributes: {
    logoImg:
      & Attribute.Media<"images" | "files" | "videos" | "audios">
      & Attribute.Required;
    logoText: Attribute.String;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: "components_layout_navbars";
  info: {
    name: "Navbar";
    displayName: "Navbar";
    icon: "map-signs";
    description: "";
  };
  attributes: {
    links: Attribute.Component<"links.link", true>;
    button: Attribute.Component<"links.button-link">;
    navbarLogo: Attribute.Component<"layout.logo">;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: "components_links_buttons";
  info: {
    name: "Button-link";
    displayName: "Button link";
    icon: "fingerprint";
    description: "";
  };
  attributes: {
    url: Attribute.String;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    type:
      & Attribute.Enumeration<["primary", "secondary"]>
      & Attribute.DefaultTo<"primary">;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: "components_links_simple_buttons";
  info: {
    name: "Button";
    displayName: "Button";
    icon: "fingerprint";
    description: "";
  };
  attributes: {
    text: Attribute.String;
    type:
      & Attribute.Enumeration<["primary", "secondary"]>
      & Attribute.DefaultTo<"primary">;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: "components_links_links";
  info: {
    name: "Link";
    displayName: "Link";
    icon: "link";
    description: "";
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: "components_links_social_links";
  info: {
    displayName: "Social Link";
    description: "";
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
    social:
      & Attribute.Enumeration<
        ["YOUTUBE", "TWITTER", "DISCORD", "XING", "LINKEDIN", "WEBSITE"]
      >
      & Attribute.Required
      & Attribute.DefaultTo<"WEBSITE">;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: "components_meta_metadata";
  info: {
    name: "Metadata";
    displayName: "Metadata";
    icon: "robot";
    description: "";
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsBottomActions extends Schema.Component {
  collectionName: "components_slices_bottom_actions";
  info: {
    name: "BottomActions";
    displayName: "Buttom actions";
    icon: "angle-double-right";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    buttons: Attribute.Component<"links.button-link", true>;
    description: Attribute.Text;
  };
}

export interface SectionsDangerousHtml extends Schema.Component {
  collectionName: "components_sections_dangerous_htmls";
  info: {
    displayName: "DangerousHTML";
  };
  attributes: {
    html: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsDynamicContent extends Schema.Component {
  collectionName: "components_sections_dynamic_contents";
  info: {
    displayName: "DynamicContent";
    description: "";
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsFeatureColumnsGroup extends Schema.Component {
  collectionName: "components_slices_feature_columns_groups";
  info: {
    name: "FeatureColumnsGroup";
    displayName: "Feature columns group";
    icon: "star-of-life";
  };
  attributes: {
    features: Attribute.Component<"elements.feature-column", true>;
  };
}

export interface SectionsFeatureRowsGroup extends Schema.Component {
  collectionName: "components_slices_feature_rows_groups";
  info: {
    name: "FeatureRowsGroup";
    displayName: "Feaures row group";
    icon: "bars";
  };
  attributes: {
    features: Attribute.Component<"elements.feature-row", true>;
  };
}

export interface SectionsFeatures extends Schema.Component {
  collectionName: "components_layout_features";
  info: {
    displayName: "Features";
    description: "";
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<"elements.feature", true>;
  };
}

export interface SectionsGradientHero extends Schema.Component {
  collectionName: "components_sections_gradient_heroes";
  info: {
    displayName: "GradientHero";
  };
  attributes: {
    content: Attribute.RichText;
    seminarCard: Attribute.Component<"elements.seminar-card", true>;
  };
}

export interface SectionsHeading extends Schema.Component {
  collectionName: "components_sections_headings";
  info: {
    displayName: "Heading";
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
    title_color:
      & Attribute.Enumeration<
        ["black", "orange", "green", "yellow", "blue", "red"]
      >
      & Attribute.Required
      & Attribute.DefaultTo<"black">;
    title_type:
      & Attribute.Enumeration<["h1", "h2", "h3", "h4", "h5", "h6"]>
      & Attribute.Required
      & Attribute.DefaultTo<"h1">;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: "components_slices_heroes";
  info: {
    name: "Hero";
    displayName: "Hero";
    icon: "heading";
    description: "";
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
    picture: Attribute.Media<"images"> & Attribute.Required;
    buttons: Attribute.Component<"links.button-link", true>;
  };
}

export interface SectionsImage extends Schema.Component {
  collectionName: "components_sections_images";
  info: {
    displayName: "Image";
  };
  attributes: {
    picture: Attribute.Media<"images", true> & Attribute.Required;
    link: Attribute.Component<"links.link">;
    small_image: Attribute.Boolean & Attribute.DefaultTo<false>;
    image_border: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SectionsLargeVideo extends Schema.Component {
  collectionName: "components_slices_large_videos";
  info: {
    name: "LargeVideo";
    displayName: "Large video";
    icon: "play-circle";
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    video: Attribute.Media<"videos"> & Attribute.Required;
    poster: Attribute.Media<"images">;
  };
}

export interface SectionsLeadForm extends Schema.Component {
  collectionName: "components_sections_lead_forms";
  info: {
    name: "Lead form";
    displayName: "Lead form";
    icon: "at";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    emailPlaceholder: Attribute.String;
    submitButton: Attribute.Component<"links.button">;
    location: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionsList extends Schema.Component {
  collectionName: "components_sections_lists";
  info: {
    displayName: "List";
    icon: "layer";
    description: "A list of items with a title and content.";
  };
  attributes: {
    listElement:
      & Attribute.Component<"elements.list-element", true>
      & Attribute.Required;
  };
}

export interface SectionsPricing extends Schema.Component {
  collectionName: "components_sections_pricings";
  info: {
    name: "Pricing";
    displayName: "Pricing";
    icon: "dollar-sign";
  };
  attributes: {
    title: Attribute.String;
    plans: Attribute.Component<"elements.plan", true>;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: "components_sections_rich_texts";
  info: {
    name: "RichText";
    displayName: "Rich text";
    icon: "text-height";
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsSeminarGroup extends Schema.Component {
  collectionName: "components_sections_seminar_groups";
  info: {
    displayName: "SeminarGroup";
  };
  attributes: {
    content: Attribute.RichText;
    seminarCard: Attribute.Component<"elements.seminar-card", true>;
  };
}

export interface SectionsTestimonialsGroup extends Schema.Component {
  collectionName: "components_slices_testimonials_groups";
  info: {
    name: "TestimonialsGroup";
    displayName: "Testimonials group";
    icon: "user-friends";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    testimonials: Attribute.Component<"elements.testimonial", true>;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: "components_shared_media";
  info: {
    displayName: "Media";
    icon: "file-video";
    description: "";
  };
  attributes: {
    file: Attribute.Media<"images">;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: "components_shared_quotes";
  info: {
    displayName: "Quote";
    icon: "indent";
    description: "";
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: "components_shared_rich_texts";
  info: {
    displayName: "Rich text";
    icon: "align-justify";
    description: "";
  };
  attributes: {
    body: Attribute.RichText;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: "components_shared_seos";
  info: {
    name: "Seo";
    icon: "allergies";
    displayName: "Seo";
    description: "";
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media<"images">;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: "components_shared_sliders";
  info: {
    displayName: "Slider";
    icon: "address-book";
    description: "";
  };
  attributes: {
    files: Attribute.Media<"images", true>;
  };
}

export interface SharedVideoEmbed extends Schema.Component {
  collectionName: "components_sections_video_embeds";
  info: {
    displayName: "Video Embed";
    description: "";
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "elements.checkbox-row": ElementsCheckboxRow;
      "elements.feature-column": ElementsFeatureColumn;
      "elements.feature-row": ElementsFeatureRow;
      "elements.feature": ElementsFeature;
      "elements.footer-section": ElementsFooterSection;
      "elements.list-element": ElementsListElement;
      "elements.logos": ElementsLogos;
      "elements.notification-banner": ElementsNotificationBanner;
      "elements.plan": ElementsPlan;
      "elements.rich-text-selector": ElementsRichTextSelector;
      "elements.seminar-card": ElementsSeminarCard;
      "elements.testimonial": ElementsTestimonial;
      "layout.footer": LayoutFooter;
      "layout.logo": LayoutLogo;
      "layout.navbar": LayoutNavbar;
      "links.button-link": LinksButtonLink;
      "links.button": LinksButton;
      "links.link": LinksLink;
      "links.social-link": LinksSocialLink;
      "meta.metadata": MetaMetadata;
      "sections.bottom-actions": SectionsBottomActions;
      "sections.dangerous-html": SectionsDangerousHtml;
      "sections.dynamic-content": SectionsDynamicContent;
      "sections.feature-columns-group": SectionsFeatureColumnsGroup;
      "sections.feature-rows-group": SectionsFeatureRowsGroup;
      "sections.features": SectionsFeatures;
      "sections.gradient-hero": SectionsGradientHero;
      "sections.heading": SectionsHeading;
      "sections.hero": SectionsHero;
      "sections.image": SectionsImage;
      "sections.large-video": SectionsLargeVideo;
      "sections.lead-form": SectionsLeadForm;
      "sections.list": SectionsList;
      "sections.pricing": SectionsPricing;
      "sections.rich-text": SectionsRichText;
      "sections.seminar-group": SectionsSeminarGroup;
      "sections.testimonials-group": SectionsTestimonialsGroup;
      "shared.media": SharedMedia;
      "shared.quote": SharedQuote;
      "shared.rich-text": SharedRichText;
      "shared.seo": SharedSeo;
      "shared.slider": SharedSlider;
      "shared.video-embed": SharedVideoEmbed;
    }
  }
}
