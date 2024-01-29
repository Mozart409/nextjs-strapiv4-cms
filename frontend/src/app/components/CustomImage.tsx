import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface Attributes {
  url: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
}

interface Datum {
  id: number;
  attributes: Attributes;
}

interface Picture {
  data: Datum[];
}

interface ImageProps {
  data: {
    id: number;
    __component: string;
    small_image: boolean;
    image_border: boolean;
    picture: Picture;
  };
}

export default function CustomImage({ data }: ImageProps) {
  let imageUrl = null;

  if (data.picture.data[0].attributes.url) {
    imageUrl = getStrapiMedia(data.picture.data[0].attributes.url);
  }

  /* if (image?.data?.attributes?.url) {
    imageUrl = getStrapiMedia(data.attributes.url);
  } */

  return (
    <>
      {imageUrl
        ? (
          <Image
            className="object-cover w-full h-96 rounded-lg"
            src={imageUrl}
            width={1000}
            height={700}
            alt={data.picture.data[0].attributes.alternativeText || ""}
          />
        )
        : null}
    </>
  );
}
