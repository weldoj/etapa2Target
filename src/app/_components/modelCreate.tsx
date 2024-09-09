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
import { useRouter } from "next/navigation";
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
import { useState } from "react";
import { Label } from "~/components/ui/label";

export default function ModalCreate() {
  const createTask = api.task.createUnique.useMutation();
  const [response, setResponse] = useState("");

  const formSchema = z.object({
    title: z.string().min(1, { message: "Campo não pode ser nulo." }),
    description: z.string(),
    status: z.string(),
    date: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "" , status: "pendente", date: new Date()},
  });

  const router = useRouter();

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await createTask
      .mutateAsync(dados)
      .then(() => {
        router.refresh();
        setResponse("Task criado com sucesso!");
      })
      .catch(() => setResponse("Ocorreu um erro ao criar o Task!"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-full row-start-2 mx-auto w-fit md:col-span-3 md:row-start-1">
          Criar Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar uma Task</DialogTitle>
          <DialogDescription>
            Formulário utilizado para criar uma nova Task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
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
            
            <div className="flex justify-end">
              <Button>Criar Task</Button>
            </div>
          </form>
        </Form>
        <Label className="w-full text-center font-semibold ">
          {response}
        </Label>
      </DialogContent>
    </Dialog>
  );
}
