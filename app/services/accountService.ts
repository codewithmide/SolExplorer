import { mainnetAxiosInstance } from '../common/utils/axios.instance';
import { ApiRequestClient } from './../common/utils/api-client';

export default class AccountService {
  static async fetchData(method: string, params: any[] = [], id: number = 1) {
    try {
      const response = await ApiRequestClient.request(method, params, id);
      if (!response) {
        return null;
      }

      if (response?.data?.error) {
        throw new Error(response.data.error.message);
      }

      return response.data.result;
    } catch (error) {
      console.error(`Error fetching data for method ${method}:`, error);
      throw error;
    }
  }

  static async getTransactionSignatures(address: string, limit = 2) {
    return this.fetchData("getSignaturesForAddress", [
      address,
      { limit }
    ]);
  }

  static async getTransactionDetails(signature: string) {
    return this.fetchData("getTransaction", [
      signature,
      { maxSupportedTransactionVersion: 0 }
    ]);
  }

  static async requestAirdrop(address: string, lamports: number) {
    const payload = {
      jsonrpc: "2.0",
      method: "requestAirdrop",
      params: [address, lamports],
      id: 1,
    };
    console.log('Airdrop request payload:', JSON.stringify(payload, null, 2));
    const response = await mainnetAxiosInstance.post("", payload);
    if (response?.data?.error) {
      throw new Error(response.data.error.message);
    }
    return response.data.result;
  }
}
