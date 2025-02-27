const axios = require("axios");
const bech32 = require("bech32");
const Pet = require("../../../models/pet");
const validateBech32Address = (address) => {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
};

const blobSubmitPet = async (req, res) => {
  try {
    const {
      namespace,
      gas_price,
      gas,
      key_name,
      signer_address,
      fee_granter_address,
      name,
    } = req.body;

    if (!namespace || !signer_address) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết" });
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
    const newPet = new Pet({
      name,
      level: 1,
      exp: 0,
      value: 100,
      owner: signer_address,
      onChain: true,
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
      })
    ).toString("base64");

    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "blob.Submit",
      params: [
        [
          {
            namespace: namespace,
            data: enCodedPetData,
            share_version: 0,
            commitment: "",
            index: -1,
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
    newPet.transactionHeight = response.data.result;
    await newPet.save();

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Lỗi khi gửi blob:", error.message);
    return res.status(500).json({
      error: "Lỗi khi gửi blob",
      details: error.response ? error.response.data : error.message,
    });
  }
};

module.exports = blobSubmitPet;
