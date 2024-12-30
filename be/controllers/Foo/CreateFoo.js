const { AppError, sendResponse } = require("../../helpers/utils");

const createFoo = async (req, res, next) => {
  //in real project you will getting info from req
  const info = {
    name: "foo",
    flag: false,
  };
  try {
    //always remember to control your inputs
    if (!info) throw new AppError(402, "Bad Request", "Create Foo Error");
    //mongoose query
    const created = await Foo.create(info);
    sendResponse(res, 200, true, { data: created }, null, "Create Foo Success");
  } catch (err) {
    next(err);
  }
};
module.exports = createFoo;
