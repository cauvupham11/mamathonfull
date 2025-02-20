const axios = require("axios");
const bech32 = require("bech32");

const { AppError, sendResponse } = require("../../helpers/utils");
const Pet = require("../../models/pet");

const validateBech32Address = (address) => {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
};
const calculateRequiredExp = (level) => {
  return 100 + (level - 1) * 30;
};
const LevelUpPet = async (req, res) => {
  try {
    const {
      userID,
      petID,
      namespace,
      gas_price,
      gas,
      key_name,
      signer_address,
      fee_granter_address,
    } = req.body;

    if (!userID || !petID || !namespace || !signer_address) {
      throw new AppError("Missing required fields", 400);
    }

    if (!validateBech32Address(signer_address)) {
      return res
        .status(400)
        .json({ error: "Địa chỉ signer_address không hợp lệ" });
    }
    if (fee_granter_address && !validateBech32Address(fee_granter_address)) {
      return res
        .status(400)
        .json({ error: "Địa chỉ fee_granter_address không hợp lệ" });
    }
    const pet = await Pet.findById(petID);
    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }
    const requiredExp = calculateRequiredExp(pet.level);
    if (pet.exp < requiredExp) {
      return res
        .status(400)
        .json({ error: "Pet doesn't have enough EXP to level up" });
    }

    const encodedPetData = Buffer.from(
      JSON.stringify({
        name: pet.name,
        level: pet.level,
        exp: pet.exp,
        value: pet.value,
        owner: pet.owner,
        onChain: true,
      })
    ).toString("base64");

    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "state.SubmitPayForBlob",
      params: [
        [
          {
            namespace_id: namespace,
            data: encodedPetData,
          },
        ],
        {
          gas_price: gas_price || 0.002,
          is_gas_price_set: true,
          gas: gas || 0.002,
          key_name: key_name || "my_celes_key",
          signer_address: signer_address,
          fee_granter_address: fee_granter_address || signer_address,
        },
      ],
    };

    const response = await axios.post("http://localhost:26658", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const txResult = response.data.result;
    if (!txResult || !txResult.txhash) {
      throw new AppError("Transaction failed", 500);
    }
    // Lưu lại transaction height vào cơ sở dữ liệu
    pet.transactionHeight = txResult.height;
    pet.transactionHash = txResult.txhash;
    // Thăng cấp cho pet
    pet.level += 1;
    pet.exp = 0; // Đặt lại exp về 0 sau khi thăng cấp
    pet.value += 150; // Tăng giá trị mỗi khi thăng cấp
    // Cập nhật pet vào cơ sở dữ liệu
    await pet.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { pet, txResult },
      null,
      `Pet has been leveled up successfully to level ${pet.level}`
    );
  } catch (error) {
    console.error("Lỗi khi gửi blob:", error.message);
    return res.status(500).json({
      error: "Lỗi khi gửi blob",
      details: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = LevelUpPet;
