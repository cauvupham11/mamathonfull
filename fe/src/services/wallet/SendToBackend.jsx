import apiService from "../../api/apiService";

export const sendWalletToBackend = async (walletAddress, signature) => {
  try {
    const response = await apiService.post("/wallets/connect", {
      walletAddress,
      signature,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gửi ví tới backend:", error);
    throw error;
  }
};
