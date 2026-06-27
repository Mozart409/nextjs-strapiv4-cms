import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsCheckboxRow extends Struct.ComponentSchema {
  collectionName: 'components_elements_checkbox_rows';
  info: {
    displayName: 'CheckboxRow';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeature extends Struct.ComponentSchema {
  collectionName: 'components_elements_features';
  info: {
    description: '';
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    newTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    showLink: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementsFeatureColumn extends Struct.ComponentSchema {
  collectionName: 'components_slices_feature_columns';
  info: {
    description: '';
    displayName: 'Feature column';
    icon: 'align-center';
    name: 'FeatureColumn';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFeatureRow extends Struct.ComponentSchema {
  collectionName: 'components_slices_feature_rows';
  info: {
    description: '';
    displayName: 'Feature row';
    icon: 'arrows-alt-h';
    name: 'FeatureRow';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'links.link', false>;
    media: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_links_footer_sections';
  info: {
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
    name: 'FooterSection';
  };
  attributes: {
    links: Schema.Attribute.Component<'links.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsListElement extends Struct.ComponentSchema {
  collectionName: 'components_elements_list_elements';
  info: {
    description: '';
    displayName: 'List Element';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsLogos extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logos';
    icon: 'apple-alt';
    name: 'logos';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsNotificationBanner extends Struct.ComponentSchema {
  collectionName: 'components_elements_notification_banners';
  info: {
    description: '';
    displayName: 'Notification banner';
    icon: 'exclamation';
    name: 'NotificationBanner';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.Component<'links.link', false>;
    show: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['alert', 'info', 'warning']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'alert'>;
  };
}

export interface ElementsPlan extends Struct.ComponentSchema {
  collectionName: 'components_elements_plans';
  info: {
    description: '';
    displayName: 'Pricing plan';
    icon: 'search-dollar';
    name: 'plan';
  };
  attributes: {
    description: Schema.Attribute.Text;
    isRecommended: Schema.Attribute.Boolean;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    pricePeriod: Schema.Attribute.String;
    product_features: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-feature.product-feature'
    >;
  };
}

export interface ElementsRichTextSelector extends Struct.ComponentSchema {
  collectionName: 'components_elements_rich_text_selectors';
  info: {
    description: '';
    displayName: 'RichTextSelector';
  };
  attributes: {};
}

export interface ElementsSeminarCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_seminar_cards';
  info: {
    description: 'A single card describing a seminar';
    displayName: 'SeminarCard';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    newTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    tilte: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_slices_testimonials';
  info: {
    description: '';
    displayName: 'Testimonial';
    icon: 'user-check';
    name: 'Testimonial';
  };
  attributes: {
    authorName: Schema.Attribute.String & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
    footerLogo: Schema.Attribute.Component<'layout.logo', false>;
    legalLinks: Schema.Attribute.Component<'links.link', true>;
    menuLinks: Schema.Attribute.Component<'links.link', true>;
    socialLinks: Schema.Attribute.Component<'links.social-link', true>;
  };
}

export interface LayoutLogo extends Struct.ComponentSchema {
  collectionName: 'components_layout_logos';
  info: {
    description: '';
    displayName: 'Logo';
  };
  attributes: {
    logoImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    logoText: Schema.Attribute.String;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    description: '';
    displayName: 'Navbar';
    icon: 'map-signs';
    name: 'Navbar';
  };
  attributes: {
    button: Schema.Attribute.Component<'links.button-link', false>;
    links: Schema.Attribute.Component<'links.link', true>;
    navbarLogo: Schema.Attribute.Component<'layout.logo', false>;
  };
}

export interface LinksButton extends Struct.ComponentSchema {
  collectionName: 'components_links_simple_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'fingerprint';
    name: 'Button';
  };
  attributes: {
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface LinksButtonLink extends Struct.ComponentSchema {
  collectionName: 'components_links_buttons';
  info: {
    description: '';
    displayName: 'Button link';
    icon: 'fingerprint';
    name: 'Button-link';
  };
  attributes: {
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    url: Schema.Attribute.String;
  };
}

export interface LinksLink extends Struct.ComponentSchema {
  collectionName: 'components_links_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
    name: 'Link';
  };
  attributes: {
    newTab: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LinksSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_links_social_links';
  info: {
    description: '';
    displayName: 'Social Link';
  };
  attributes: {
    newTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    social: Schema.Attribute.Enumeration<
      ['YOUTUBE', 'TWITTER', 'DISCORD', 'XING', 'LINKEDIN', 'WEBSITE']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'WEBSITE'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaMetadata extends Struct.ComponentSchema {
  collectionName: 'components_meta_metadata';
  info: {
    description: '';
    displayName: 'Metadata';
    icon: 'robot';
    name: 'Metadata';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBottomActions extends Struct.ComponentSchema {
  collectionName: 'components_slices_bottom_actions';
  info: {
    description: '';
    displayName: 'Button Actions';
    icon: 'angle-double-right';
    name: 'BottomActions';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'links.button-link', true>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsDangerousHtml extends Struct.ComponentSchema {
  collectionName: 'components_sections_dangerous_htmls';
  info: {
    displayName: 'DangerousHTML';
  };
  attributes: {
    html: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsDynamicContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_dynamic_contents';
  info: {
    description: '';
    displayName: 'DynamicContent';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface SectionsFeatureColumnsGroup extends Struct.ComponentSchema {
  collectionName: 'components_slices_feature_columns_groups';
  info: {
    displayName: 'Feature columns group';
    icon: 'star-of-life';
    name: 'FeatureColumnsGroup';
  };
  attributes: {
    features: Schema.Attribute.Component<'elements.feature-column', true>;
  };
}

export interface SectionsFeatureRowsGroup extends Struct.ComponentSchema {
  collectionName: 'components_slices_feature_rows_groups';
  info: {
    displayName: 'Feaures row group';
    icon: 'bars';
    name: 'FeatureRowsGroup';
  };
  attributes: {
    features: Schema.Attribute.Component<'elements.feature-row', true>;
  };
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_layout_features';
  info: {
    description: '';
    displayName: 'Features';
  };
  attributes: {
    description: Schema.Attribute.Text;
    feature: Schema.Attribute.Component<'elements.feature', true>;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsGradientHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_gradient_heroes';
  info: {
    displayName: 'GradientHero';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    seminarCard: Schema.Attribute.Component<'elements.seminar-card', true>;
  };
}

export interface SectionsHeading extends Struct.ComponentSchema {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    title_color: Schema.Attribute.Enumeration<
      ['black', 'orange', 'green', 'yellow', 'blue', 'red']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'black'>;
    title_type: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'h1'>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_slices_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'heading';
    name: 'Hero';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'links.button-link', true>;
    description: Schema.Attribute.String & Schema.Attribute.Required;
    picture: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsImage extends Struct.ComponentSchema {
  collectionName: 'components_sections_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image_border: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'links.link', false>;
    picture: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    small_image: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SectionsLargeVideo extends Struct.ComponentSchema {
  collectionName: 'components_slices_large_videos';
  info: {
    displayName: 'Large video';
    icon: 'play-circle';
    name: 'LargeVideo';
  };
  attributes: {
    description: Schema.Attribute.String;
    poster: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface SectionsLeadForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_lead_forms';
  info: {
    description: '';
    displayName: 'Lead form';
    icon: 'at';
    name: 'Lead form';
  };
  attributes: {
    description: Schema.Attribute.Text;
    emailPlaceholder: Schema.Attribute.String;
    location: Schema.Attribute.String;
    submitButton: Schema.Attribute.Component<'links.button', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsList extends Struct.ComponentSchema {
  collectionName: 'components_sections_lists';
  info: {
    description: 'A list of items with a title and content.';
    displayName: 'List';
    icon: 'layer';
  };
  attributes: {
    listElement: Schema.Attribute.Component<'elements.list-element', true> &
      Schema.Attribute.Required;
  };
}

export interface SectionsPricing extends Struct.ComponentSchema {
  collectionName: 'components_sections_pricings';
  info: {
    displayName: 'Pricing';
    icon: 'dollar-sign';
    name: 'Pricing';
  };
  attributes: {
    plans: Schema.Attribute.Component<'elements.plan', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'text-height';
    name: 'RichText';
  };
  attributes: {
    content: Schema.Attribute.RichText;
  };
}

export interface SectionsSeminarGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_seminar_groups';
  info: {
    displayName: 'SeminarGroup';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    seminarCard: Schema.Attribute.Component<'elements.seminar-card', true>;
  };
}

export interface SectionsTestimonialsGroup extends Struct.ComponentSchema {
  collectionName: 'components_slices_testimonials_groups';
  info: {
    description: '';
    displayName: 'Testimonials group';
    icon: 'user-friends';
    name: 'TestimonialsGroup';
  };
  attributes: {
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<'elements.testimonial', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    description: '';
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    description: '';
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    author: Schema.Attribute.String;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich Text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_embeds';
  info: {
    description: '';
    displayName: 'Video Embed';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.checkbox-row': ElementsCheckboxRow;
      'elements.feature': ElementsFeature;
      'elements.feature-column': ElementsFeatureColumn;
      'elements.feature-row': ElementsFeatureRow;
      'elements.footer-section': ElementsFooterSection;
      'elements.list-element': ElementsListElement;
      'elements.logos': ElementsLogos;
      'elements.notification-banner': ElementsNotificationBanner;
      'elements.plan': ElementsPlan;
      'elements.rich-text-selector': ElementsRichTextSelector;
      'elements.seminar-card': ElementsSeminarCard;
      'elements.testimonial': ElementsTestimonial;
      'layout.footer': LayoutFooter;
      'layout.logo': LayoutLogo;
      'layout.navbar': LayoutNavbar;
      'links.button': LinksButton;
      'links.button-link': LinksButtonLink;
      'links.link': LinksLink;
      'links.social-link': LinksSocialLink;
      'meta.metadata': MetaMetadata;
      'sections.bottom-actions': SectionsBottomActions;
      'sections.dangerous-html': SectionsDangerousHtml;
      'sections.dynamic-content': SectionsDynamicContent;
      'sections.feature-columns-group': SectionsFeatureColumnsGroup;
      'sections.feature-rows-group': SectionsFeatureRowsGroup;
      'sections.features': SectionsFeatures;
      'sections.gradient-hero': SectionsGradientHero;
      'sections.heading': SectionsHeading;
      'sections.hero': SectionsHero;
      'sections.image': SectionsImage;
      'sections.large-video': SectionsLargeVideo;
      'sections.lead-form': SectionsLeadForm;
      'sections.list': SectionsList;
      'sections.pricing': SectionsPricing;
      'sections.rich-text': SectionsRichText;
      'sections.seminar-group': SectionsSeminarGroup;
      'sections.testimonials-group': SectionsTestimonialsGroup;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.video-embed': SharedVideoEmbed;
    }
  }
}
