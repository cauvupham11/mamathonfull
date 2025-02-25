const axios = require("axios");
const { AppError, sendResponse } = require("../../helpers/utils");

// Kiểm tra tính khả dụng của pet trên mạng Celestia và lấy giá từ metadata
const checkPetOnCelestia = async (namespace_id, height) => {
  const payload = {
    id: 1,
    jsonrpc: "2.0",
    method: "share.SharesAvailable",
    params: [height],  // Hoặc bạn có thể sử dụng txhash nếu cần
  };

  try {
    const response = await axios.post("http://localhost:26658", payload, {
      headers: { "Content-Type": "application/json" },
    });

    const sharesAvailable = response.data.result;
    if (!sharesAvailable || sharesAvailable.length === 0) {
      throw new AppError("Pet not found on Celestia network", 404);
    }

    // Lấy metadata từ dữ liệu
    const metadata = sharesAvailable[0].data.metadata;
    if (!metadata || !metadata.price) {
      throw new AppError("Price not found in metadata", 400);
    }

    // Ghi lại giá trị từ metadata và trả về
    console.log("Price from metadata:", metadata.price); // Log giá trị metadata

    // Trả về giá trị price từ metadata
    return parseFloat(metadata.price);
  } catch (error) {
    console.error("Error checking pet on Celestia network", error);
    throw new AppError("Error checking pet on Celestia network", 500);
  }
};

// Kiểm tra số dư của người mua
const checkBuyerBalance = async (buyer_address) => {
  const balanceResponse = await axios.post("http://localhost:26658", {
    id: 1,
    jsonrpc: "2.0",
    method: "state.BalanceForAddress",
    params: [buyer_address],
  });

  const buyerBalance = balanceResponse.data.result;
  if (!buyerBalance) {
    throw new AppError("Buyer balance not found", 400);
  }

  return parseFloat(buyerBalance.amount); // Trả về số dư của người mua
};

// Tạo giao dịch chuyển tiền từ người mua sang người bán
const createTransferTransaction = async (
  buyer_address,
  signer_address,
  fee_granter_address
) => {
  const payload = {
    id: 1,
    jsonrpc: "2.0",
    method: "state.Transfer",
    params: [
      signer_address, // Địa chỉ người bán
      0,              // Không sử dụng giá
      {
        gas_price: 0.002,
        is_gas_price_set: true,
        gas: 142225,
        key_name: "my_celes_key",
        signer_address: buyer_address,
        fee_granter_address: fee_granter_address || signer_address,
      },
    ],
  };

  return axios.post("http://localhost:26658", payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// API chính để mua pet
const buyPet = async (req, res) => {
  try {
    const { petId, buyer_address, signer_address, fee_granter_address, namespace_id, height, price } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!petId || !buyer_address || !signer_address || !namespace_id || !height) {
      throw new AppError("Missing required information", 400);
    }

    // Kiểm tra tính khả dụng của pet trên mạng Celestia và lấy giá từ metadata
    const petPrice = await checkPetOnCelestia(namespace_id, height);

    // Kiểm tra giá trị price có khớp với giá trị trong metadata
    console.log("Price from request:", price); // Log giá từ request
    console.log("Price from Celestia metadata:", petPrice); // Log giá từ Celestia

    if (parseFloat(price) !== petPrice) {
      throw new AppError("Price mismatch with metadata", 400);
    }
    // Kiểm tra người mua
    const buyer = await User.findById(buyer_address);
    if (!buyer) {
      throw new AppError("Buyer not found", 404);
    }
    // Kiểm tra số dư của người mua
    const buyerBalance = await checkBuyerBalance(buyer_address);
    if (buyerBalance < petPrice) {
      throw new AppError("Insufficient balance", 400);
    }
    const seller = await User.findById(signer_address);
    if (!seller) {
      throw new AppError("Seller not found", 404);
    }
    // Thực hiện thanh toán
    buyer.balance -= petPrice;
    seller.balance += petPrice;
    await buyer.save();
    await seller.save();
    // Chuyển quyền sở hữu vật phẩm
    item.owner = buyer_address;
    item.isListedForSale = false;
    await item.save();

    // Mã hóa dữ liệu giao dịch và metadata
    const purchaseData = JSON.stringify({
      itemId: petId,
      newOwner: buyer_address,
      oldOwner: seller._id,
      price: petPrice,
      timestamp: Date.now(),
      metadata: item.metadata || {},  // Lấy dữ liệu metadata đã lưu trong item
    });
    // Định dạng payload để gửi lên Celestia
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "state.SubmitPayForBlob",
      params: [
        [
          {
            namespace_id: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAwn/EaU0x0Q==", // Cần thay đổi theo không gian (namespace) thực tế
            data: Buffer.from(purchaseData).toString("base64"), // Chuyển dữ liệu mua vật phẩm thành base64
          },
        ],
        {
          gas_price: 0.002,
          is_gas_price_set: true,
          gas: 142225,
          key_name: "my_celes_key",
          signer_address: signer_address,
          fee_granter_address: fee_granter_address || signer_address,
        },
      ],
    };
    // Gửi yêu cầu lên Celestia
    const response = await axios.post("http://localhost:26658", payload, {
      headers: { "Content-Type": "application/json" },
    });
    // Kiểm tra phản hồi từ Celestia
    const txResult = response.data.result;
    if (!txResult || !txResult.txhash) {
      throw new AppError("Transaction failed", 500);
    }
    // Lưu kết quả giao dịch và metadata vào item
    item.transactionHeight = txResult.height;
    item.transactionHash = txResult.txhash;
    await item.save();
    return sendResponse(res, 200, true, { item, txResult }, null, "Mua pet thành công");
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Lỗi máy chủ nội bộ",
    });
  }
};
module.exports = buyPet;
