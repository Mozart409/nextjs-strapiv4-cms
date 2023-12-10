import MarkdownRenderer from "../utils/MarkdownRenderer";

interface LevelModelProps {
  data: {
    title: string;
    content: string;
  };
}

export default function LevelModel({ data }: LevelModelProps) {
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
      {console.debug(data)}
    </>
  );
}
