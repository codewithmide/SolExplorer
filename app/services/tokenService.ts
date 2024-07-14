import axios from 'axios';

export const fetchTokenMetadata = async (mintAddress: any) => {
  const url = process.env.NEXT_PUBLIC_MAINNET_API_BASE_URL; 

  try {
    const response = await axios.post(String(url), {
      jsonrpc: "2.0",
      id: "1",
      method: "getAsset",
      params: {
        id: mintAddress,
      },
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
};
