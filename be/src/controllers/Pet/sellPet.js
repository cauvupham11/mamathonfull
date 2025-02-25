const axios = require("axios");
const Pet = require("../../models/pet");
const { AppError, sendResponse } = require("../../helpers/utils");

const sellpet = async (req, res) => {
  try {
    const { petId, name, price, signer_address, fee_granter_address, namespace_id, metadata } = req.body;

    if (!petId || !price || !name) {
      throw new AppError("Thiếu thông tin bắt buộc", 400);
    }

    const pet = await Pet.findById(petId);

    // Kiểm tra xem thú cưng có tồn tại không
    if (!pet) {
      throw new AppError("Không tìm thấy thú cưng", 403);
    }

    // Tạo một đối tượng pet mới
    const newPet = new Pet({
      name,
      level: 1,
      exp: 0,
      value: 100,
      owner: signer_address,
      onChain: true,
      price: price,  // Lưu giá vào đối tượng Pet mới
      metadata: metadata || {}  // Lưu metadata vào đối tượng Pet mới
    });

    await newPet.save();

    const enCodedPetData = Buffer.from(
      JSON.stringify({
        name: newPet.name,
        level: newPet.level,
        exp: newPet.exp,
        value: newPet.value,
        owner: newPet.owner,
        onChain: newPet.onChain,
        price: newPet.price, // Đảm bảo rằng giá được mã hóa vào blob
        metadata: newPet.metadata // Mã hóa metadata
      })
    ).toString("base64");

    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "state.SubmitPayForBlob",
      params: [
        [
          {
            namespace_id: namespace_id,
            data: enCodedPetData,
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

    const response = await axios.post("http://127.0.0.1:26658", payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Kiểm tra phản hồi từ API
    if (!response.data || !response.data.result) {
      console.error("API không trả về kết quả hợp lệ:", response.data);
      throw new AppError("Giao dịch thất bại, không có phản hồi hợp lệ", 500);
    }
    const txResult = response.data.result;
    // Kiểm tra nếu `txResult.height` hoặc `txResult.txhash` không tồn tại
    if (!txResult.height || !txResult.txhash) {
      console.error("Giao dịch không hợp lệ:", txResult);
      throw new AppError("Giao dịch thất bại, dữ liệu không hợp lệ", 500);
    }
    // Cập nhật thông tin của thú cưng gốc
    pet.transactionHeight = txResult.height;
    pet.transactionHash = txResult.txhash;
    pet.isListedForSale = true;
    pet.price = price;  // Cập nhật giá vào đối tượng pet đã đăng bán
    pet.metadata = newPet.metadata; // Cập nhật metadata
    await pet.save();
    // Trả về thông tin pet đã đăng bán, bao gồm cả giá và metadata
    return sendResponse(res, 200, true, { pet, txResult }, null, "Đăng bán vật phẩm thành công");
  } catch (error) {
    console.error(error);
    
    // Đảm bảo `statusCode` là số nguyên hợp lệ
    const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Lỗi máy chủ nội bộ",
    });
  }
};

module.exports = sellpet;
