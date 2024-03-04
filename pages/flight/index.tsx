import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllFlights } from "@/hooks/hook";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FormSchema } from "..";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Flight = () => {
  const flightDetails = useStore((state) => state.flightDetails);
  const setFlightDetails = useStore((state) => state.setFlightDetails);
  const { data: flights, isLoading } = useAllFlights(flightDetails);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      originLocationCode: flightDetails?.originLocationCode,
      destinationLocationCode: flightDetails?.destinationLocationCode,
      departureDate: flightDetails?.departureDate as Date,
      adults: flightDetails?.adults,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setFlightDetails({
      ...data,
      departureDate: format(data.departureDate as Date, "yyyy-MM-dd"),
    });
  };

  return (
    <div className="flex items-center flex-col p-5 sm:p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-2 flex-wrap items-center justify-center mb-10"
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
          <Button type="reset" variant={"outline"} onClick={() => form.reset()}>
            Clear
          </Button>
        </form>
      </Form>

      {isLoading ? (
        <h1 className="text-center">Loading ...</h1>
      ) : (
        <Table className="border rounded-lg">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className="w-[200px] font-bold">Duration</TableHead>
              <TableHead className="font-bold">From</TableHead>
              <TableHead className="font-bold">To</TableHead>
              <TableHead className="font-bold">Aircraft</TableHead>
              <TableHead className="text-right font-bold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights?.data.map((details: any) => (
              <TableRow key={details.id}>
                <TableCell className="font-medium">
                  {details.itineraries[0].duration.replace("PT", "")}
                </TableCell>

                <TableCell>
                  <div className="font-semibold">
                    {details.itineraries[0]?.segments[0]?.departure.iataCode}
                  </div>
                  <div className="text-gray-500">
                    {format(
                      details.itineraries[0]?.segments[0]?.departure.at,
                      "hh:mm a"
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="font-semibold">
                    {details.itineraries[0]?.segments[0]?.arrival.iataCode}
                  </div>
                  <div className="text-gray-500">
                    {format(
                      details.itineraries[0]?.segments[0]?.arrival.at,
                      "hh:mm a"
                    )}
                  </div>
                </TableCell>

                <TableCell className="text-gray-500">
                  {details.itineraries[0]?.segments[0]?.carrierCode +
                    details.itineraries[0]?.segments[0]?.number}
                </TableCell>

                <TableCell className="text-right font-semibold">
                  ${details.price.grandTotal}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Flight;
