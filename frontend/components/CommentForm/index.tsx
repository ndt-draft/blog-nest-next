"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  content: z.string({}).trim().min(1, {
    message: "Enter comment content",
  }),
});

type FormData = z.infer<typeof formSchema> & { postId: number } & {
  parentId?: string;
};

type Props = {
  postId: number;
  parentId?: string;
  onSubmit: (params: FormData) => void | Promise<void>;
  setCommentParentId?: React.Dispatch<React.SetStateAction<string | null>>;
};

function CommentForm({
  postId,
  parentId,
  onSubmit,
  setCommentParentId,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onCancel() {
    if (typeof setCommentParentId === "function") {
      setCommentParentId(null);
    }
  }

  function onSubmitForm(data: z.infer<typeof formSchema>) {
    onSubmit({
      postId,
      parentId,
      ...data,
    });

    // reset form after submit
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comment to this post"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        {parentId && (
          <Button
            type="button"
            variant="secondary"
            className="ml-4"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </form>
    </Form>
  );
}

export default CommentForm;
