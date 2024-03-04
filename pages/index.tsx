import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const FormSchema = z.object({
  originLocationCode: z.string(),
  destinationLocationCode: z.string(),
  departureDate: z.date(),
  adults: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number({ invalid_type_error: "must be a number" }).positive()
  ),
});

const Home = () => {
  const setFlightDetails = useStore((state) => state.setFlightDetails);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      originLocationCode: "",
      destinationLocationCode: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setFlightDetails({
      ...data,
      departureDate: format(data.departureDate as Date, "yyyy-MM-dd"),
    });

    form.reset();
    router.push("/flight");
  };

  return (
    <>
      <main
        className={`flex gap-2 min-h-screen items-center justify-center flex-col bg-contain bg-no-repeat bg-center ${inter.className}`}
        style={{ backgroundImage: `url(./images/WorldMap.png)` }}
      >
        <h1 className="mb-10 w-84 text-4xl font-semibold text-center bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text lg:text-6xl">
          It&apos;s more than just a trip
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex gap-2 flex-wrap items-center justify-center"
          >
            <FormField
              control={form.control}
              name="originLocationCode"
              render={({ field }) => (
                <FormItem className="w-full px-8 sm:px-0 sm:max-w-32">
                  <Select
                    key={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="From Where" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DVO">DVO</SelectItem>
                      <SelectItem value="MNL">MNL</SelectItem>
                      <SelectItem value="SYD">SYD</SelectItem>
                      <SelectItem value="BNE">BNE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destinationLocationCode"
              render={({ field }) => (
                <FormItem className="w-full px-8 sm:px-0 sm:max-w-32">
                  <Select
                    key={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Where To" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DVO">DVO</SelectItem>
                      <SelectItem value="MNL">MNL</SelectItem>
                      <SelectItem value="SYD">SYD</SelectItem>
                      <SelectItem value="BNE">BNE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full px-8 sm:px-0 sm:max-w-40">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "yyyy-MM-dd")
                          ) : (
                            <span>Departure Date</span>
                          )}
                          <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 my-4 bg-secondary"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        onSelect={field.onChange}
                        disabled={(date: any) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="max-w-24"
                      placeholder="Adults"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
            <Button
              type="reset"
              variant={"outline"}
              onClick={() => form.reset()}
            >
              Clear
            </Button>
          </form>
        </Form>
      </main>

      <p className="text-center"> 
        Find your next adventure with these <a href={'/'} className="text-indigo-500">flight deals</a>
      </p>
      <div className="flex flex-wrap justify-center p-5 gap-5 sm:p-10">
        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image1.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image2.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image3.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image2.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image3.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>

        <Card className="w-full sm:w-auto">
          <Image
            className="rounded-t-lg w-full"
            alt="image"
            src={require("../public/images/Image1.svg")}
          />
          <CardFooter className="flex justify-between mt-4">
            <p>Lorem</p>
            <p className="font-semibold">$200</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Home;
