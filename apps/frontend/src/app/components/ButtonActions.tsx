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
    <div key={data.id} className="w-full mt-4 bg-primary-800 py-20 text-center">
      <h2 className="text-4xl font-bold mb-10 text-white">{data.title}</h2>
      <p>{data.description}</p>
      <div className="container flex flex-row flex-wrap justify-center gap-4">
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
  );
}
