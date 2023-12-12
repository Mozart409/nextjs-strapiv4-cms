import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MarkdownRenderer from "../utils/MarkdownRenderer";

interface RichTextProps {
  data: {
    id: string;
    content: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section key={data.id} className="py-6 mx-auto dark:text-gray-50 dark:bg-black">
      <MarkdownRenderer text={data.content} />
    </section>
  );
}
