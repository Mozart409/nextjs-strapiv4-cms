"use server";

import { EmailTemplate } from "@/app/components/email-template";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { z, ZodError } from "zod";

export type FormState = {
  message: string;
};

export const fromErrorToFormState = (error: unknown) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
    };
    // if another error instance, return error message
    // e.g. database error
  }
  if (error instanceof Error) {
    return {
      message: error.message,
    };
    // if not an error instance but something else crashed
    // return generic error message
  }
  return {
    message: "An unknown error occurred",
  };
};

const EmailSchema = z.object({
  username: z.string().optional(),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .min(1, { message: "Email is required" }),
  phonenumber: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type EmailSchema = z.infer<typeof EmailSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResendEmail(formData: EmailSchema) {
  console.debug("formData", formData);

  try {
    /* const { username, email, phonenumber, subject, message } =
      EmailSchema.parse({
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        phonenumber: formData.get("phonenumber") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      }); */
    const { username, email, phonenumber, subject, message } =
      EmailSchema.parse(formData);

    const { data, error } = await resend.emails.send({
      from: "kontakt@ideal-coaching.com",
      to: ["kontakt@ideal-coaching.com"],
      subject: subject,
      react: EmailTemplate({
        username,
        message,
        email,
        phonenumber,
        subject,
      }),
    });
    console.info("resend data", data);
    console.error("resend error", error);

    if (error) {
      return { message: error.message };
    }
    revalidatePath("/kontakt");
    return { message: `✅ Email sent from ${email}` };
  } catch (error) {
    return { message: fromErrorToFormState(error) };
  }

  /* try {

        // const { email } = schema.parse(formData);
        console.debug("formData", formData);
        const { data, error } = await resend.emails.send({
            from: email,
            to: ["roberto@ideal-coaching.com"],
            subject: "Hello world",
            react: EmailTemplate({ firstName: "John" }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    } */

  // toast.success("Email sent successfully");
}
