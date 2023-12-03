"use client";

import Heading from "@/components/non-shadcn/Heading";
import { Image } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { formSchema } from "./constants";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import Empty from "@/components/non-shadcn/Empty";
import Loader from "@/components/non-shadcn/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/non-shadcn/UserAvatar";
import BotAvatar from "@/components/non-shadcn/BotAvatar";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setImages([]);
      //asynchronous API call using Axios to the "/api/image" endpoint with the newMessages array as part of the request payload.
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  // extract the loading state
  const isLoading = form.formState.isSubmitting;
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        icon={Image}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10 ">
                    <FormControl className="m-0 p-0">
                      <Input
                        placeholder="Horses grazing on an open field"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <div>
              <Empty label="No images to show" />
            </div>
          )}
          <div>Images will be rendered here</div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
