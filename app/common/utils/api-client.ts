import axiosInstance from "./axios.instance";

class ApiClient {
  request(method: string, params: any[] = [], id: number = 1) {
    const payload = {
      jsonrpc: "2.0",
      method,
      params,
      id,
    };
    return axiosInstance.post("", payload);
  }
}

export const ApiRequestClient = new ApiClient();
