"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { YearPicker } from "./YearPicker";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  year: z.number().max(new Date().getFullYear(), {
    message: "Please enter a valid year.",
  }),
  longitude: z.string().min(1, {
    message: "Longitude is required.",
  }),
  latitude: z.string().min(1, {
    message: "Latitude is required.",
  }),
});

export function DataForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      year: new Date().getFullYear(),
      longitude: "",
      latitude: "",
    },
  });

  const { setValue } = form;

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { year, ...rest } = values;
    const selectedYear = parseInt(year as unknown as string, 10);
    const today = new Date();
    const selectedDate = new Date(
      selectedYear,
      today.getMonth(),
      today.getDate()
    );

    console.log({
      ...rest,
      year: selectedYear,
      selectedDate,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg w-full"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-neutral-400 font-[400]">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  {...field}
                  className="bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 border-0 rounded-xl text-gray-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="text-neutral-400 font-[400]">
                Year you want to check
              </FormLabel>
              <FormControl>
                <YearPicker
                  onYearSelect={(selectedYear) =>
                    setValue("year", selectedYear)
                  } // Update the year in form state
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between w-full">
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-400 font-[400]">
                  Longitude
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter longitude"
                    {...field}
                    className="bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 border-0 rounded-xl text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-400 font-[400]">
                  Latitude
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter latitude"
                    {...field}
                    className="bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 border-0 rounded-xl text-gray-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          variant="secondary"
          type="submit"
          className="w-full select-none"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
