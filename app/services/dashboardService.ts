import { ApiRequestClient } from './../common/utils/api-client';

export default class DashboardService {
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

    static async fetchRecentPerformanceSamples() {
        return this.fetchData('getRecentPerformanceSamples', [10]);
    }
}
