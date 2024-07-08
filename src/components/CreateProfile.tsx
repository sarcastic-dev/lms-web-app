"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import CreateInstitute from "./CreateInstitute";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type Props = {
  input: {
    email: string;
    phone: string;
  };
};

const CreateProfile = ({ input }: Props) => {
  console.log("input", input.email, input.phone);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: input.email,
      phone: input.phone,
      password: "",
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInstituteCreation, setShowInstituteCreation] = useState(false);

  const parseName = (name: string) => {
    const nameParts = name.trim().split(" ");
    const parsedName: {
      firstName: string;
      middleName?: string;
      lastName?: string;
    } = { firstName: nameParts[0] };

    if (nameParts.length === 2) {
      parsedName.lastName = nameParts[1];
    } else if (nameParts.length >= 3) {
      parsedName.middleName = nameParts.slice(1, -1).join(" ");
      parsedName.lastName = nameParts[nameParts.length - 1];
    }
    return parsedName;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const example = parseName(values.name);
    try {
      const response = await axiosInstance.post("/users", {
        ...example,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "admin",
      });
      console.log("Form submitted:", response);
      setUserId(response.data.values);
      setTimeout(() => {
        setIsCreating(false);
        setShowInstituteCreation(true);
      }, 2000);
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Error creating user. Please try again.");
      setIsCreating(false);
    }

    console.log(example);
    console.log(values);
  }

  if (showInstituteCreation) {
    return <CreateInstitute userId={userId} />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white border p-8 rounded-lg shadow-xl w-2/6 h-5/6 z-10 space-y-5"
      >
        <h1 className="text-2xl text-center text-blue-500 font-bold mb-3">
          Account Details
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Please enter your details
        </p>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Account"}
        </Button>

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </form>
    </Form>
  );
};

export default CreateProfile;
function setShowInstituteCreation(arg0: boolean) {
  throw new Error("Function not implemented.");
}
