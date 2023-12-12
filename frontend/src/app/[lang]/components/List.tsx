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
      <div className="mx-auto mt-5 container lg:max-w-md lg:text-left xl:max-w-lg">
        {data.listElement.map((item) => (
          <div key={item.id}>
            <ul className="space-y-4">
              <li className="list-check list-inside align-baseline">
                <span className="text-left text-2xl font-bold text-black">
                  {item.title}
                </span>
                <MarkdownRenderer text={item.content} />
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-8 break-words">
        {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
        {/* {console.log(data)} */}
      </div>
    </>
  );
}
