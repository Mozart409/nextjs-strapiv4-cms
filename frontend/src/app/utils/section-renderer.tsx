import CustomImage from "../components/CustomImage";
import Email from "../components/Email";
import Features, { FeatureRowGroup } from "../components/Features";
import GradientHero from "../components/GradientHero";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import List from "../components/List";
import Pricing from "../components/Pricing";
import RichText from "../components/RichText";
import Testimonials from "../components/Testimonials";

export function sectionRenderer(section: any, index: number) {
  // console.debug(section.__component);
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.heading":
      return <Heading key={index} data={section} />;
    case "sections.list":
      return <List key={index} data={section} />;
    case "sections.gradient-hero":
      return <GradientHero key={index} data={section} />;
    case "sections.rich-text":
      return <RichText key={index} data={section} />;
    case "sections.feature-rows-group":
      return <FeatureRowGroup key={index} data={section} />;
    case "sections.image":
      return <CustomImage key={index} data={section} />;
    case "sections.bottom-actions":
      return null;
    default:
      return null;
  }
}
