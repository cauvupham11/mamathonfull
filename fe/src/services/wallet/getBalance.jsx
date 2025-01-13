import apiService from "../../api/apiService";

export const getBalanceFromWallet = async (walletAddress) => {
  try {
    const response = await apiService.get(
      `https://rpc-mocha.pops.one/cosmos/bank/v1beta1/balances/${walletAddress}`
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy số dư từ ví:", error);
    throw error;
  }
};
