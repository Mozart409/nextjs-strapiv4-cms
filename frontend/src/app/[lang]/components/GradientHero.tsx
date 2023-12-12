import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { getStrapiMedia } from "../utils/api-helpers";
import MarkdownRenderer from "../utils/MarkdownRenderer";

interface GradientHero {
  data: {
    component: string;
    id: number;
    title: string;
    blackText: string;
    coloredText: string;
    content: string;
    title_color: "black" | "orange" | "green" | "yellow" | "blue" | "red";
    seminarCard: SeminarCard[];
  };
}

interface Attributes {
  url: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Image {
  data: Data;
}

interface SeminarCard {
  id: number;
  tilte: string;
  text: string;
  category: string;
  url: string;
  newTab: boolean;
  image: Image;
}

const SingleCard = ({
  category,
  id,
  image,
  newTab,
  text,
  tilte,
  url,
}: SeminarCard) => {
  let imageUrl = null;

  if (image?.data?.attributes?.url) {
    imageUrl = getStrapiMedia(image.data.attributes.url);
  }

  return (
    <div
      key={id}
      className="flex h-full flex-col overflow-y-auto rounded-lg shadow-lg"
    >
      <Link
        href={url}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : ""}
        title={tilte}
      >
        <div className="relative flex-shrink-0">
          {imageUrl
            ? (
              <Image
                className="h-96 w-full object-cover"
                src={imageUrl}
                width={1000}
                height={700}
                alt={image.data.attributes.alternativeText || image.data.attributes.caption || ""}
              />
            )
            : null}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="mx-auto flex flex-1 flex-col justify-between bg-white py-2 px-6">
              <div className="flex-1">
                <p className="text-md bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-left font-bold text-transparent">
                  Category {category}
                </p>
                <div className="justify-left mt-2 flex">
                  <MarkdownRenderer text={text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

function GradientHero({ data }: GradientHero): ReactElement {
  return (
    <div>
      <div className="relative mx-auto max-w-5xl">
        <div className="relative mx-auto rounded">
          <div className="absolute inset-0 z-0 h-[85vh] max-w-7xl">
            <div className="cssgradient h-[85vh] lg:h-[75vh] xl:h-[65vh] 2xl:h-[85vh]"></div>
          </div>
          <div className="relative m-8">
            <div className="absolute inset-0">
              <div className="h-1/3 sm:h-2/3"></div>
            </div>
            <div className="relative mx-auto max-w-7xl">
              <div className="pt-8 text-center">
                <MarkdownRenderer text={data.content} />
              </div>

              <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-3 lg:max-w-none lg:grid-cols-1">
                {data.seminarCard.map((node) => <SingleCard key={node.id} {...node} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradientHero;
