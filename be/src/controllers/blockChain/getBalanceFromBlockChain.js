const axios = require("axios");

const getBalanceFromNode = async (walletAddress) => {
  try {
    const apiUrl = `https://celestia-testnet-lcd.numia.xyz/cosmos/bank/v1beta1/balances/${walletAddress}`;
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer sk_af348cf2662b4bb482e8481efa6406b5",
    };

    const response = await axios.get(apiUrl, { headers });

    const balances = response.data?.balances || [];
    const tiaBalance = balances.find((balance) => balance.denom === "utia");

    return tiaBalance ? parseFloat(tiaBalance.amount) / 1e6 : 0;
  } catch (error) {
    console.error("Lỗi khi lấy số dư từ Numia:", error.message);
    throw new Error("Không thể lấy số dư từ Numia");
  }
};

module.exports = getBalanceFromNode;
