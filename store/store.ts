import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Flight = {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate?: Date | string;
  adults: number;
};

export interface IFlight {
  flightDetails: Flight;
  setFlightDetails: (flight: Flight) => void;
}

const useStore = create<IFlight>()(
  persist(
    (set) => ({
      flightDetails: {
        originLocationCode: "",
        destinationLocationCode: "",
        adults: 0,
      },

      setFlightDetails: (flight: Flight) =>
        set((state) => ({
          flightDetails: {
            ...state.flightDetails,
            originLocationCode: flight.originLocationCode,
            destinationLocationCode: flight.destinationLocationCode,
            departureDate: flight.departureDate,
            adults: flight.adults,
          },
        })),
    }),
    {
      name: "flights",
    }
  )
);

export default useStore;
