const axios = require("axios");
const Pet = require("../../../models/pet");
const { AppError, sendResponse } = require("../../../helpers/utils");

const getPetData = async (req, res, next) => {
  try {
    const { petId } = req.query;

    if (!petId) {
      throw new AppError("Missing information required", 400);
    }
    const pet = await Pet.findById(petId);
    if (!pet) {
      throw new AppError("Pet has not found ", 404);
    }
    console.log("Pet found:", pet);
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "header.GetByHeight",
      params: [pet.transactionHeight],
    };
    const response = await axios.post("http://localhost:26658", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataOnchain = response.data;
    return sendResponse(
      res,
      200,
      true,
      { pet, dataOnchain },
      null,
      "Lấy thông tin Pet thành công"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getPetData };
