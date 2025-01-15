const axios = require("axios");

const validateWalletAddress = async (walletAddress) => {
  try {
    const rpcEndpoint = `https://celestia-testnet-lcd.numia.xyz/cosmos/auth/v1beta1/accounts/${walletAddress}`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NUMIA_API_KEY}`,
    };

    const response = await axios.get(rpcEndpoint, { headers });

    if (response.status === 200 && response.data.account) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Lỗi khi xác thực địa chỉ ví:", error.message);
    return false;
  }
};

module.exports = validateWalletAddress;
