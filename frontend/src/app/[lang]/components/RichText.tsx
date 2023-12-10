import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="py-6 dark:text-gray-50 dark:bg-black rich-text">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
