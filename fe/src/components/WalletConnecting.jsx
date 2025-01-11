import { useState } from "react";
import { sendWalletToBackend } from "../services/wallet/sentToBackend";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.keplr) {
      alert("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
      return;
    }

    try {
      const chainId = "mocha";
      await window.keplr.enable(chainId);

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length > 0) {
        const walletAddress = accounts[0].address;

        const message = `Connect wallet at ${new Date().toISOString()}`;
        const signature = await window.keplr.signArbitrary(
          chainId,
          walletAddress,
          message
        );

        setWalletAddress(walletAddress);
        setSignature(signature.signature);
        setConnected(true);
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví:", error);
    }
  };

  const handleSendToBackend = async () => {
    try {
      const response = await sendWalletToBackend(walletAddress, signature);
      alert(`Kết nối thành công! Server trả về: ${response.message}`);
    } catch (error) {
      alert(`Lỗi: ${error.message || "Không thể kết nối ví"}`);
    }
  };

  return (
    <div>
      <h1>Kết nối ví Celestia</h1>
      <button onClick={connectWallet}>
        {connected ? `Đã kết nối: ${walletAddress}` : "Kết nối ví"}
      </button>
      {connected && (
        <button onClick={handleSendToBackend}>Gửi ví tới backend</button>
      )}
    </div>
  );
};

export default WalletConnect;
