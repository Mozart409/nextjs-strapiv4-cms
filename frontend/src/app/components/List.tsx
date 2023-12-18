import MarkdownRenderer from "../utils/MarkdownRenderer";
import { ColorWrapper, HeadingWrapper } from "../utils/render-title-style";

interface ListElement {
  id: string;
  title: string;
  content: string;
}

interface ListProps {
  data: {
    id: string;
    listElement: ListElement[];
  };
}

export default function List({ data }: ListProps) {
  return (
    <>
      <div className="container mx-auto mt-5 lg:max-w-md lg:text-left xl:max-w-lg">
        {data.listElement.map((item) => (
          <div key={item.id}>
            <ul className="space-y-4">
              <li className="list-inside align-baseline list-check">
                <span className="text-2xl font-bold text-left text-black">
                  {item.title}
                </span>
                <MarkdownRenderer text={item.content} />
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="container px-4 mx-auto break-words sm:px-8">
        {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      </div>
    </>
  );
}
