"use client";
import { useEffect, useState } from "react";
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
import { getHistory } from "@/server/action";

const formSchema = z.object({
  year: z
    .number()
    .min(1, {
      message: "Year is required.",
    })
    .max(new Date().getFullYear(), {
      message: "Please enter a valid year.",
    }),
  longitude: z.number().min(1, {
    message: "Longitude is required.",
  }),
  latitude: z.number().min(1, {
    message: "Latitude is required.",
  }),
});

export function DataForm({
  setHistoryData,
}: {
  setHistoryData: (data: string) => void;
}) {
  const [btnloading, setBtnLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      longitude: 0,
      latitude: 0,
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("longitude", position.coords.longitude);
          setValue("latitude", position.coords.latitude);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, [setValue]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBtnLoading(true);
    const { year, longitude, latitude } = values;
    const selectedDate = new Date(
      year,
      new Date().getMonth(),
      new Date().getDate()
    );

    try {
      const data = await getHistory(selectedDate, latitude, longitude);
      setHistoryData(data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
      setHistoryData("Error fetching historical data.");
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg w-full"
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel className="text-neutral-400 font-[400]">
                Year you want to check in
              </FormLabel>
              <FormControl>
                <YearPicker
                  onYearSelect={(selectedYear) =>
                    setValue("year", selectedYear)
                  }
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
          className={`w-full select-none ${btnloading ? "cursor-not-allowed" : ""} `}
          disabled={btnloading}
        >
          {btnloading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
