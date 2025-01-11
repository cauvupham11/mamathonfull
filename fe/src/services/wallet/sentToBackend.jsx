import apiService from "../../api/apiService";

/**
 * Hàm gửi địa chỉ ví lên backend
 * @param {string} walletAddress - Địa chỉ ví của người dùng
 * @returns {Promise<Object>} - Kết quả từ server
 */
export const sendWalletToBackend = async (walletAddress, signature) => {
  try {
    const response = await apiService.post("/wallet/connect", {
      walletAddress,
      signature,
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi gửi ví tới backend:", error);
    throw error;
  }
};
