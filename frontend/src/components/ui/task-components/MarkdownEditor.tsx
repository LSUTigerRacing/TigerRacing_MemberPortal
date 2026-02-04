// Task Description component for previewing and displaying unique description creation

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Bold, Italic, Heading } from "lucide-react";
import remarkGfm from "remark-gfm";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function DescriptionEditor({ value, onChange }: Props) {
  const [activeTab, setActiveTab] = useState("write");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const insertMarkdown = (syntax: string, placeholder = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selectedText = value.substring(start, end) || placeholder;
    const markdown = syntax.replace("{}", selectedText);

    const newText = value.substring(0, start) + markdown + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + markdown.length;
    }, 0);
  };

  return (
    <div className="border rounded-lg focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b px-3 py-2">
          <TabsList className="h-8">
            <TabsTrigger value="write" className="text-sm cursor-pointer">
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-sm cursor-pointer">
              Preview
            </TabsTrigger>
          </TabsList>
          {activeTab === "write" && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-white cursor-pointer"
                onClick={() => insertMarkdown("# {}\n", "Heading")}
              >
                <Heading className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-white cursor-pointer"
                onClick={() => insertMarkdown("**{}**", "bold text")}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 bg-white cursor-pointer"
                onClick={() => insertMarkdown("*{}*", "italic text")}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <TabsContent value="write" className="m-0">
          <Textarea
            ref={textareaRef}
            className="min-h-[200px] max-h-[200px] border-0 focus-visible:ring-0 rounded-t-none"
            placeholder="Type your description here..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </TabsContent>
        <TabsContent value="preview" className="m-0 p-4 min-h-[200px]">
          {value ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Nothing to preview</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
