import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkDownProps {
  text: string;
}

export default function MarkdownRenderer({ text }: MarkDownProps) {
  return (
    <>
      <Markdown
        className="prose prose-lg md:prose-lg lg:prose-2xl prose-headings:underline prose-a:text-primary-600"
        children={text}
        remarkPlugins={[remarkGfm]}
      />
    </>
  );
}
