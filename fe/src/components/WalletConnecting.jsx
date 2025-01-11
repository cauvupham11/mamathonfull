import { useState } from "react";
import { sendWalletToBackend } from "../services/wallet/sentToBackend";
import { toast } from "react-toastify";

const WalletConnecting = ({ onConnectSuccess }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.keplr) {
      toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
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

        // Hiển thị thông báo thành công
        toast.success("Kết nối ví thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví:", error);
      toast.error("Lỗi khi kết nối ví!");
    }
  };

  const handleSendToBackend = async () => {
    try {
      setLoading(true);
      await sendWalletToBackend(walletAddress, signature);
      setLoading(false);

      // Hiển thị thông báo thành công
      toast.success("Gửi ví tới backend thành công!");

      if (onConnectSuccess) onConnectSuccess();
    } catch (error) {
      setLoading(false);
      toast.error(`Lỗi: ${error.message || "Không thể gửi ví tới backend"}`);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
        onClick={connectWallet}
        disabled={loading}
      >
        {connected ? `Đã kết nối: ${walletAddress}` : "Kết nối ví"}
      </button>

      {connected && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          onClick={handleSendToBackend}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Gửi ví tới backend"}
        </button>
      )}
    </div>
  );
};

export default WalletConnecting;
