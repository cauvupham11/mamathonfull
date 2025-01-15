import apiService from "../../api/apiService"; // Đảm bảo đường dẫn chính xác

/**
 * Hàm kiểm tra trạng thái ví đã liên kết
 * @param {string} walletAddress - Địa chỉ ví của người dùng
 * @returns {Promise<Object>} - Kết quả từ server
 */
export const checkWallet = async (walletAddress) => {
  if (!walletAddress) {
    throw new Error("Địa chỉ ví không được để trống.");
  }
  try {
    const response = await apiService.post("/wallet/check", {
      walletAddress,
    });
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái ví:", error.response || error.message);
    throw error;
  }
};
