import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://test.api.amadeus.com",
});

AxiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  } else {
    delete config.headers?.Authorization;
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (reject) => {
    if (reject.response?.status === 401) {
      const result = await Auth();
      const token = result.data.access_token;

      localStorage.setItem("token", token as string);
    }
  }
);

const params: any = {
  client_id: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
  client_secret: `${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
  grant_type: "client_credentials",
};
 
const data = Object.keys(params)
  .map((key, index) => `${key}=${encodeURIComponent(params[key])}`)
  .join("&");

const Auth = async () => {
  const result = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return result ?? {};
};
