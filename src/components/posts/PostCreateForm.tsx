"use client";

import { createPost } from "@/actions/posts";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormButton from "../common/FormButton";

const PostCreateForm = ({ slug }: { slug: string }) => {
  const [state, formAction] = useFormState(createPost, {
    error: {},
  });

  console.log("params", slug);

  return (
    <aside>
      <Popover placement='left-start'>
        <PopoverTrigger>
          <Button color='primary'>New Post</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            action={formAction}
            className='p-5 flex flex-col gap-3 w-80'
          >
            <h3 className='text-lg'>Create Post</h3>
            <Input
              type='text'
              label='title'
              labelPlacement='outside'
              placeholder='Topic Name'
              name='title'
              isInvalid={!!state?.error?.title}
              errorMessage={state?.error?.title}
            />
            <Input
              hidden
              type='text'
              name='topic'
              value={slug}
            />
            <Textarea
              name='content'
              label='Content'
              labelPlacement='outside'
              placeholder='Describe your topic'
              isInvalid={!!state?.error?.content}
              errorMessage={state?.error?.content}
            />
            {state.error?.general && (
              <p className='text-red-600 p-2 bg-red-200 border border-red-400 rounded-xl text-lg'>
                {state.error.general?.join(", ")}
              </p>
            )}
            <FormButton>Submit</FormButton>
          </form>
        </PopoverContent>
      </Popover>
    </aside>
  );
};

export default PostCreateForm;
