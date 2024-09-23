"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/newButton";
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
import { FormType } from "@/types";
import { showToast } from "@/utils/toastHelper";
import { upperFirst } from "lodash";
import { CircleX } from "lucide-react";
import { RootState } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUserId } from "@/context/auth/signupSlice";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface CreateProfileProps {
  setUserId: (id: string) => void;
}

const CreateProfile: React.FC<CreateProfileProps> = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: user.formData.userData.email,
      phone: user.formData.userData.phone,
      password: "",
    },
  });

  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      const userId = response.data.id;
      console.log("Form submitted:", response);
      dispatch(setUserId(userId));
      setIsCreating(false);
      router.push("/createInstitute");
      showToast("success", "User created successfully");
    } catch (error: any) {
      console.error("Error during user creation:", error);
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred while creating the user."
      );
      setIsCreating(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 sm:w-[320px] md:w-[380px] lg:w-[466px] h-5/6 z-10"
      >
        <div className="flex flex-col space-y-3 md:pt-14">
          <h1 className="text-2xl text-start text-[#07254A] font-bold mb-3">
            Account Details
          </h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-[#07254A]">Name</FormLabel>
                <FormControl>
                  <Input
                    className="rounded xl:h-10 xl:py-0 md:text-xs lg:text-sm"
                    placeholder="Enter Name"
                    {...field}
                  />
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
                <FormLabel className="text-sm text-[#07254A]">
                  Email ID
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded xl:h-10 xl:py-0 md:text-xs lg:text-sm"
                    placeholder="Enter Email ID"
                    {...field}
                    readOnly
                  />
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
                <FormLabel className="text-sm text-[#07254A]">
                  Mobile No.
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded xl:h-10 xl:py-0 md:text-xs lg:text-sm"
                    placeholder="Mobile No."
                    {...field}
                    // readOnly
                  />
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
                <FormLabel className="text-sm text-[#07254A]">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="rounded xl:h-10 xl:py-0 md:text-xs lg:text-sm"
                    type="password"
                    placeholder="Enter Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant={"lmsActive"}
            className="w-full"
            type="submit"
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create Account"}
          </Button>

          {errorMessage && (
            <div className="bg-red-200 text-lmsError h-10 px-3 w-full mt-5 rounded flex items-center gap-2 text-sm">
              <CircleX size={20} /> {upperFirst(errorMessage)}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateProfile;
