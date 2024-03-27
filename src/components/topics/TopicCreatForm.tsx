"use client";

import { createTopic } from "@/actions/topics";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import React from "react";
import { useFormState } from "react-dom";

const TopicCreatForm = () => {
  const [state, formAction] = useFormState(createTopic, {
    error: {},
  });

  console.log("state", state);

  return (
    <aside>
      <Popover placement='left-start'>
        <PopoverTrigger>
          <Button>New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            action={formAction}
            className='p-5 flex flex-col gap-3 w-80'
          >
            <h3 className='text-lg'>Create Topic</h3>
            <Input
              type='text'
              label='Name'
              labelPlacement='outside'
              placeholder='Topic Name'
              name='name'
              isInvalid={!!state.error.name}
              errorMessage={state.error.name || ""}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Describe your topic'
              isInvalid={!!state.error.description}
              errorMessage={state.error.description || ""}
            />
            <Button type='submit'>Submit</Button>
          </form>
        </PopoverContent>
      </Popover>
    </aside>
  );
};

export default TopicCreatForm;
