import React, { useState, useEffect } from "react";
import { sendToBackend } from "../services/wallet/sentToBackend";
import { checkWallet } from "../services/wallet/CheckWallet";
import { toast } from "react-toastify";
import "../css/WalletConnecting.css"; // Import CSS

const addMochaChain = async () => {
  if (!window.keplr) {
    toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
    return;
  }
  try {
    await window.keplr.experimentalSuggestChain({
      chainId: "mocha-4", // Thay đổi ID chain thành mocha-4
      chainName: "Mocha Testnet 4", // Tên chain
      rpc: "https://rpc.mocha-4.testnet.com", // Thay bằng URL RPC thực tế
      rest: "https://rest.mocha-4.testnet.com", // Thay bằng URL REST thực tế
      bip44: {
        coinType: 118,
      },
      coinType: 118,
      stakeCurrency: {
        coinDenom: "MOCHA",
        coinMinimalDenom: "umocha",
        coinDecimals: 6,
      },
      bech32Config: {
        bech32PrefixAccAddr: "mocha",
        bech32PrefixAccPub: "mochapub",
        bech32PrefixValAddr: "mochavaloper",
        bech32PrefixValPub: "mochavaloperpub",
        bech32PrefixConsAddr: "mochavalcons",
        bech32PrefixConsPub: "mochavalconspub",
      },
      currencies: [
        {
          coinDenom: "MOCHA",
          coinMinimalDenom: "umocha",
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "MOCHA",
          coinMinimalDenom: "umocha",
          coinDecimals: 6,
        },
      ],
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
      features: ["stargate", "ibc-transfer", "cosmwasm"],
    });
    toast.success("Chain Mocha-4 đã được thêm vào Keplr!");
  } catch (error) {
    console.error("Lỗi khi thêm chain Mocha-4 vào Keplr:", error);
    toast.error("Lỗi khi thêm chain Mocha-4 vào Keplr.");
  }
};
const WalletConnecting = ({ onConnectSuccess }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signature, setSignature] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const autoLogin = async () => {
      if (!window.keplr) {
        toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
        return;
      }

      try {
        const chainId = "mocha-4";

        // Thêm chain Mocha-4 vào Keplr
        await addMochaChain();

        // Kích hoạt chain Mocha-4
        await window.keplr.enable(chainId);

        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        if (accounts.length > 0) {
          const walletAddress = accounts[0].address;
          setWalletAddress(walletAddress);

          const walletStatus = await checkWallet(walletAddress);
          if (walletStatus.wallet) {
            setConnected(true);
            setStatus(`Ví đã được liên kết với tài khoản: ${walletStatus.user.name}`);
            toast.success("Đăng nhập thành công!");
          } else {
            setStatus("Ví chưa được liên kết. Vui lòng liên kết ví.");
            toast.info("Ví chưa được liên kết.");
          }
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái ví:", error);
        toast.error("Lỗi khi kiểm tra trạng thái ví!");
      }
    };

    autoLogin();
  }, []);

  const connectWallet = async () => {
    if (!window.keplr) {
      toast.error("Keplr Wallet chưa được cài đặt. Vui lòng cài đặt!");
      return;
    }

    try {
      const chainId = "mocha-4";

      // Thêm chain Mocha-4 vào Keplr
      await addMochaChain();

      // Kích hoạt chain Mocha-4
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

        setLoading(true);
        await sendToBackend(walletAddress, signature.signature); // Gửi thông tin ví lên backend
        setConnected(true);
        setStatus("Ví đã được liên kết thành công!");
        toast.success("Ví đã được liên kết thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví:", error);
      toast.error("Lỗi khi kết nối ví!");
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
            onClick={connectWallet}
            disabled={loading}
          >
            Connect to the
          </button>
        )}
        {status && <p className="wallet-status">{status}</p>}
      </div>
    </div>
  );
};

export default WalletConnecting;
