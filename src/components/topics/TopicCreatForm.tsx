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

const TopicCreatForm = () => {
  return (
    <aside>
      <Popover placement='left-start'>
        <PopoverTrigger>
          <Button>New Topic</Button>
        </PopoverTrigger>
        <PopoverContent>
          <form
            action={createTopic}
            className='p-5 flex flex-col gap-3 w-80'
          >
            <h3 className='text-lg'>Create Topic</h3>
            <Input
              type='text'
              label='Name'
              labelPlacement='outside'
              placeholder='Topic Name'
              name='name'
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Describe your topic'
            />
            <Button type='submit'>Submit</Button>
          </form>
        </PopoverContent>
      </Popover>
    </aside>
  );
};

export default TopicCreatForm;
