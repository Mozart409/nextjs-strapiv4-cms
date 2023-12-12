import MarkdownRenderer from "../utils/MarkdownRenderer";
import { ColorWrapper, HeadingWrapper } from "../utils/render-title-style";

interface ListElement {
  id: string;
  title: string;
  title_color: "orange" | "green" | "yellow" | "blue" | "red";
  content: string;
}

interface ListProps {
  data: {
    id: string;
    title: string;
    content: string;
    listElement: ListElement[];
  };
}

export default function List({ data }: ListProps) {
  return (
    <>
      <pre>{JSON.stringify(data,null,2)}</pre>
      {/* {console.log(data)} */}
      <div className="mx-auto py-6 text-center lg:text-left">
        <div className="px-4 sm:px-8">
          <div className="mx-auto mb-4">
            <div className="mx-auto max-w-prose md:mt-5 md:max-w-3xl prose">
              <MarkdownRenderer text={data.title} />
            </div>
            <div className="mx-auto max-w-prose md:mt-5 md:max-w-3xl prose">
              <MarkdownRenderer text={data.content} />
            </div>
          </div>
          <div>
            {data.listElement.map((item) => (
              <div className="mt-8" key={item.id}>
                <ul className="space-y-4">
                  <li className="list-check list-inside align-baseline">
                    <span className="text-left text-2xl font-bold text-black">
                      {item.title}
                    </span>
                    <div>
                      <div className="mx-auto max-w-prose md:max-w-3xl lg:ml-10">
                        <MarkdownRenderer text={item.content} />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 break-words">
        {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
        {/* {console.log(data)} */}
      </div>
    </>
  );
}
