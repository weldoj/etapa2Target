"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { api } from "~/trpc/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function ModalEdit({ id }: { id: number }) {
  const formSchema = z.object({
    title: z.string().min(1, { message: "Campo não pode ser nulo." }),
    description: z.string(),
    status: z.string(),
    date: z.date(),
  });


  const router = useRouter();
  const [response, setResponse] = useState("");

  const updateTask = api.task.updateUnique.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" , status: "pendente", date: new Date()},
  });

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await updateTask
      .mutateAsync({ id, ...dados })
      .then(() => {
        router.refresh();
        setResponse("Alteração feita com sucesso!");
      })
      .catch(() => setResponse("Ocorreu um erro ao editar a task!"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" ">
          Editar task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar a task</DialogTitle>
          <DialogDescription>
            Formulário utilizado para editar o task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex">
              <Button>Editar task</Button>
            </div>
          </form>
        </Form>
        <Label className="w-full text-center font-semibold text-red-600">
          {response}
        </Label>
      </DialogContent>
    </Dialog>
  );
}
