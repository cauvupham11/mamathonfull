const axios = require("axios");
const Pet = require("../../../models/pet");
const { AppError, sendResponse } = require("../../../helpers/utils");

const getPetData = async (req, res, next) => {
  try {
    const { petId, namespace } = req.query;

    if (!petId || !namespace) {
      return res
        .status(400)
        .json({ error: "Thiếu thông tin cần thiết: petId hoặc namespace" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res
        .status(404)
        .json({ error: "Pet không tồn tại trong cơ sở dữ liệu" });
    }

    let celestiaData = null;
    if (pet.onChain) {
      try {
        const response = await axios.post("http://localhost:26658", {
          id: 1,
          jsonrpc: "2.0",
          method: "blob.Get",
          params: [
            {
              height: 0,
              namespace: namespace,
              commitment: pet._id.toString(),
            },
          ],
        });

        if (response.data && response.data.result) {
          celestiaData = response.data.result;
        } else {
          console.error(
            "Không tìm thấy dữ liệu từ Celestia. Cấu trúc commit có thể không đúng."
          );
        }
      } catch (error) {
        console.error("Lỗi khi truy vấn dữ liệu từ Celestia:", error.message);
      }
    }

    return sendResponse(
      res,
      200,
      true,
      { pet, celestiaData },
      null,
      "Lấy thông tin Pet thành công"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getPetData };
