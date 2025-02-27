import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import "../css/WalletConnecting.css";
import { sendWalletToBackend } from "../services/wallet/SendToBackend";
import { checkWallet } from "../services/wallet/CheckWallet";

const WalletConnecting = ({ onConnectSuccess }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [localWalletAddress, setLocalWalletAddress] = useState("");
  const [localSignature, setLocalSignature] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isKeplr, setIsKeplr] = useState(true); // Track if Keplr or Local Wallet is selected
  const navigate = useNavigate();  // Initialize useNavigate

  const connectKeplrWallet = async () => {
    if (!window.keplr) {
      toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
      return;
    }

    try {
      const chainId = "mocha";

      if (!connected) {
        await window.keplr.enable(chainId);
      }

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();

      if (accounts.length > 0) {
        const walletAddress = accounts[0].address;

        const message = `Connect wallet at ${new Date().toISOString()}`;
        const signature = await window.keplr.signArbitrary(chainId, walletAddress, message);

        setWalletAddress(walletAddress);
        setSignature(signature.signature);

        setLoading(true);
        const walletStatus = await checkWallet(walletAddress);

        if (walletStatus?.wallet) {
          setConnected(true);
          toast.success("Ví Keplr đã được liên kết!");
        } else {
          await sendWalletToBackend(walletAddress, signature.signature);
          setConnected(true);
          toast.success("Ví Keplr đã được liên kết thành công!");
        }

        if (onConnectSuccess) onConnectSuccess();

        // Sau khi kết nối thành công, điều hướng đến trang StartPage
        navigate("/start-page");  // Chuyển hướng sang StartPage
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví hoặc gửi backend:", error);
      toast.error("Lỗi: Không thể kết nối ví hoặc gửi backend!");
    } finally {
      setLoading(false);
    }
  };

  const connectLocalWallet = async () => {
    if (!localWalletAddress || !localSignature) {
      toast.error("Cần nhập địa chỉ ví và chữ ký!");
      return;
    }

    try {
      setLoading(true);

      const walletStatus = await checkWallet(localWalletAddress);

      if (walletStatus?.wallet) {
        setConnected(true);
        toast.success("Ví local đã được liên kết!");
      } else {
        await sendWalletToBackend(localWalletAddress, localSignature);
        setConnected(true);
        toast.success("Ví local đã được liên kết thành công!");
      }

      if (onConnectSuccess) onConnectSuccess();

      // Sau khi kết nối thành công, điều hướng đến trang StartPage
      navigate("/start");  // Chuyển hướng sang StartPage
    } catch (error) {
      console.error("Lỗi khi kết nối ví local hoặc gửi backend:", error);
      toast.error("Lỗi: Không thể kết nối ví local hoặc gửi backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-container">
      <div className="wallet-box">
        {/* Motion animation for logo */}
        <motion.img
          src="https://store-images.s-microsoft.com/image/apps.33644.b30b59e9-066d-4218-b91a-e9a076c2efde.90c13d55-8d3a-4b0f-95b5-9883c3c38008.c3300503-05e8-4957-ade2-1653e88f0584"
          alt="Logo"
          className="wallet-logo animate-logo"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Motion animation for text */}
        <motion.p
          className="wallet-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {isKeplr ? "Connect Keplr Wallet" : "Connect Local Wallet"}
        </motion.p>

        {/* Switch between Keplr Wallet and Local Wallet */}
        <div className="wallet-type-switch">
          <button
            className={`wallet-switch-button ${isKeplr ? "active" : ""}`}
            onClick={() => setIsKeplr(true)}
          >
            Keplr Wallet
          </button>
          <button
            className={`wallet-switch-button ${!isKeplr ? "active" : ""}`}
            onClick={() => setIsKeplr(false)}
          >
            Local Wallet
          </button>
        </div>

        {/* Keplr Wallet Connection */}
        {isKeplr ? (
          <motion.button
            className={`wallet-button animate-button ${loading ? "disabled-button" : "connect-button"}`}
            onClick={connectKeplrWallet}
            disabled={loading}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#6b46c1",
              transition: { duration: 0.3 },
            }}
            whileTap={{
              scale: 0.95,
              backgroundColor: "#5a3ba9",
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            {loading ? "Đang xử lý..." : "Connect to Keplr Wallet"}
          </motion.button>
        ) : (
          <div className="local-wallet-inputs">
            <input
              type="text"
              placeholder="Nhập địa chỉ ví local"
              value={localWalletAddress}
              onChange={(e) => setLocalWalletAddress(e.target.value)}
              className="wallet-input"
            />
            <input
              type="text"
              placeholder="Nhập chữ ký ví local"
              value={localSignature}
              onChange={(e) => setLocalSignature(e.target.value)}
              className="wallet-input"
            />
            <motion.button
              className={`wallet-button animate-button ${loading ? "disabled-button" : "connect-button"}`}
              onClick={connectLocalWallet}
              disabled={loading}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#6b46c1",
                transition: { duration: 0.3 },
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: "#5a3ba9",
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              {loading ? "Đang xử lý..." : "Connect to Local Wallet"}
            </motion.button>
          </div>
        )}

        {connected && (
          <motion.p
            className="wallet-status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            Ví đã kết nối: {walletAddress}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default WalletConnecting;
