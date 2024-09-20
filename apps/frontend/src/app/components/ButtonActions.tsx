import Link from "next/link";
import { renderButtonStyle } from "../utils/render-button-style";

interface Props {
  data: {
    id: number;
    title: string;
    description: string;
    buttons: {
      id: number;
      url: string;
      text: string;
      type: string;
      newTab: boolean;
    }[];
  };
}

export default function ButtonActions({ data }: Props) {
  return (
    <div key={data.id} className="max-w-5xl mx-auto">
      <div className="text-center bg-primary-800 py-8 px-8 lg:px-32">
        <h2 className="mb-10 text-4xl font-bold text-white">{data.title}</h2>
        <p>{data.description}</p>
        <div className="container flex flex-row flex-wrap gap-4 justify-center">
          {data.buttons.map((button) => (
            <Link
              key={button.id}
              href={button.url}
              target={button.newTab ? "_blank" : "_self"}
              className={renderButtonStyle(button.type)}
            >
              {button.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
