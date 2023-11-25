import * as z from "zod";

//Define the shape of your form using a Zod schema. You can read more about using Zod in the Zod documentation

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});