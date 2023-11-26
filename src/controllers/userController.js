import { responseData } from "../config/Response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

let model = initModels(sequelize);

export const getUser = async (req, res) => {
  try {
    let data = await model.users.findAll();
    responseData(res, "Thành công", data, 200);
  } catch {
    responseData(res, "Lỗi ...", "", 500);
  }
};
