import MarkdownRenderer from "../utils/MarkdownRenderer";

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
          {
            /* <div>
            {data.LevelRow.map((item) => <LevelRow key={item.id} data={item} />)}
          </div> */
          }
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 break-words">
        {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
        {/* {console.log(data)} */}
      </div>
    </>
  );
}
