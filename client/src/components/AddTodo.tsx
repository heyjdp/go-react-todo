import { useState } from "react";
import { useForm } from "@mantine/form";
import { Group, Button, Modal, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";


function AddTodo({ mutate }: { mutate: KeyedMutator<Todo[]> }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: '',
      body: ''
    },
  });

  async function createTodo(values: { title: string, body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated)
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create ToDo">
        <form action="" onSubmit={form.onSubmit(createTodo)} >
          <TextInput required mb={12} label="ToDo" placeholder="What do you want to do?"
            {...form.getInputProps("title")} />
          <Textarea required mb={12} label="Body" placeholder="Say more"
            {...form.getInputProps("body")} />

          <Button type="submit">Create ToDo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          ADD TODO
        </Button>
      </Group>
    </>
  );
}

export default AddTodo;
