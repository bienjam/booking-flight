import { useQuery } from "react-query";
import axios from "axios";
import { Flight } from "@/store/store";
import { AxiosInstance } from "@/config/axios";

const useAllFlights = (params: Flight) => {
  return useQuery(["flights", params], async () => {
    const { data } = await AxiosInstance.get(
      `/v2/shopping/flight-offers?originLocationCode=${params.originLocationCode}&destinationLocationCode=${params.destinationLocationCode}&departureDate=${params.departureDate}&adults=${params.adults}&max=10`
    );

    return data;
  });
};

export { useAllFlights };
