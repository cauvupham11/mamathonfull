import { useState } from "react";
import { toast } from "react-toastify";
import "../css/WalletConnecting.css"; // Import CSS
import { sendWalletToBackend } from "../services/wallet/SendToBackend";
import { checkWallet } from "../services/wallet/CheckWallet";

const WalletConnecting = ({ onConnectSuccess }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectWalletAndSendToBackend = async () => {
    if (!window.keplr) {
      toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
      return;
    }

    try {
      const chainId = "mocha";

      // Kích hoạt ví nếu chưa kết nối
      if (!connected) {
        await window.keplr.enable(chainId);
      }

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length > 0) {
        const walletAddress = accounts[0].address;

        // Tạo signature
        const message = `Connect wallet at ${new Date().toISOString()}`;
        const signature = await window.keplr.signArbitrary(
          chainId,
          walletAddress,
          message
        );

        setWalletAddress(walletAddress);
        setSignature(signature.signature);

        // Kiểm tra nếu ví đã liên kết
        setLoading(true);
        const walletStatus = await checkWallet(walletAddress);

        if (walletStatus?.wallet) {
          // Nếu đã liên kết
          setConnected(true);
          toast.success("Ví đã được liên kết!");
          if (onConnectSuccess) onConnectSuccess();
        } else {
          // Nếu chưa liên kết, gửi thông tin lên backend
          await sendWalletToBackend(walletAddress, signature.signature);
          setConnected(true);
          toast.success("Ví đã được liên kết thành công!");
          if (onConnectSuccess) onConnectSuccess();
        }
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví hoặc gửi backend:", error);
      toast.error("Lỗi: Không thể kết nối ví hoặc gửi backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-container">
      <div className="wallet-box">
        <img
          src="https://store-images.s-microsoft.com/image/apps.33644.b30b59e9-066d-4218-b91a-e9a076c2efde.90c13d55-8d3a-4b0f-95b5-9883c3c38008.c3300503-05e8-4957-ade2-1653e88f0584"
          alt="Logo"
          className="wallet-logo animate-logo"
        />
        <p className="wallet-text">Connect Keplr Wallet</p>
        {!connected && (
          <button
            className={`wallet-button animate-button ${
              loading ? "disabled-button" : "connect-button"
            }`}
            onClick={connectWalletAndSendToBackend}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Connect to the"}
          </button>
        )}
        {connected && (
          <p className="wallet-status">Ví đã kết nối: {walletAddress}</p>
        )}
      </div>
    </div>
  );
};

export default WalletConnecting;
