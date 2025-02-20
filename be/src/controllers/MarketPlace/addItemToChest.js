const { AppError, sendResponse } = require("../../helpers/utils");
const House = require("../../models/house");
const Item = require("../../models/item"); // Giả sử bạn có một model cho item

const addItemToChest = async (req, res, next) => {
  try {
    const { userID, itemID, quantity } = req.body;

    if (!userID || !itemID || !quantity) {
      throw new AppError("Missing required fields", 400);
    }

    // Tìm item theo itemID
    const item = await Item.findById(itemID);
    if (!item) {
      throw new AppError("Item not found", 404);
    }

    // Tìm user và nhà của họ
    const user = await User.findById(userID).populate("house");
    if (!user || !user.house) {
      throw new AppError("User or user's house not found", 404);
    }

    const house = await House.findById(user.house._id);
    if (!house) {
      throw new AppError("House not found", 404);
    }

    // Kiểm tra xem người dùng có đủ balanceFiat để mua item không (nếu cần thiết)
    const totalCost = item.value * quantity;
    if (user.balanceFiat < totalCost) {
      throw new AppError("Insufficient balanceFiat", 400);
    }

    // Giảm số dư balanceFiat của người dùng nếu cần
    user.balanceFiat -= totalCost;
    await user.save();

    // Kiểm tra xem item đã có trong chest chưa
    let itemInChest = house.chest.items.find(
      (chestItem) => chestItem._id.toString() === itemID
    );

    if (itemInChest) {
      // Nếu item đã có trong chest, kiểm tra số lượng có đủ không
      if (itemInChest.quantity + quantity > house.chestCapacity) {
        throw new AppError("Exceeds chest capacity", 400);
      }
      // Tăng số lượng item trong chest
      itemInChest.quantity += quantity;
    } else {
      // Nếu chưa có, tạo mới item và thêm vào chest
      itemInChest = {
        _id: item._id,
        name: item.name,
        type: item.type,
        quantity: quantity,
        value: item.value,
      };

      // Kiểm tra số lượng có vượt quá capacity không
      if (quantity > house.chestCapacity) {
        throw new AppError("Exceeds chest capacity", 400);
      }

      house.chest.items.push(itemInChest);
    }

    // Giảm quantity trong item model (gốc)
    item.quantity -= quantity;
    await item.save();

    // Lưu cập nhật vào house
    await house.save();

    // Gửi phản hồi thành công
    sendResponse(
      res,
      200,
      true,
      { user, house },
      null,
      `Added ${quantity} of ${item.name} to the chest and deducted ${totalCost} USD from user's balanceFiat`
    );
  } catch (error) {
    next(error);
  }
};

module.exports = addItemToChest;
