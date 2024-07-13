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

  static async getTransactionSignatures(address: string, limit = 5) {
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
    return this.fetchData("requestAirdrop", [address, lamports]);
  }
}
