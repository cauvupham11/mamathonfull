import apiService from "../../api/apiService";

export const sendToBackend = async (walletAddress, signature) => {
  try {
    const response = await apiService.post("/wallets/connect", {
      walletAddress,
      signature,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gửi ví tới backend:", {
      message: error.message,
      config: error.config,
      request: error.request,
      response: error.response?.data || error.response || "No Response",
    });
    throw error;
  }
};
