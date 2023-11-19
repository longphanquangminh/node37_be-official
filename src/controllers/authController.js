import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

import { responseData } from "../config/Response.js";

let model = initModels(sequelize);

export const login = async (req, res) => {
  try {
    let { email, pass_word } = req.body;
    // check email và pass_word == table user
    // SELECT * FROM users WHERE email=email AND pass_word=pass_word
    // if(email == email && pass_word == pass_word)
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });
    // tồn tại => login thành công
    if (checkUser) {
      if (checkUser.pass_word == pass_word) {
        responseData(res, "Login thành công", "token", 200);
      } else {
        responseData(res, "Mật khẩu không đúng", "", 400);
      }
    } else {
      responseData(res, "Email không đúng", "", 400);
    }
    // ko tồn tại => sai email hoặc pass
  } catch {
    responseData(res, "Lỗi ...", "", 500);
  }
};

export const signUp = async (req, res) => {
  try {
    // Create => thêm mới users
    let { full_name, email, pass_word } = req.body;

    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });

    if (checkUser) {
      responseData(res, "Email đã tồn tại", "", 400);
      return;
    }

    let newData = {
      full_name,
      email,
      pass_word,
      avatar: "",
      face_app_id: "",
      role: "user",
    };

    // INSERT INTO VALUES
    await model.users.create(newData);
    responseData(res, "Đăng ký thành công", "", 200);
  } catch {
    responseData(res, "Lỗi ...", "", 500);
  }
};

export const loginFacebook = async (req, res) => {
  try {
    let { full_name, faceAppId } = req.body;
    // kiểm tra facebook app id
    let checkUser = await model.users.findOne({
      where: {
        face_app_id: faceAppId,
      },
    });
    // nếu đã tồn tại => login
    if (!checkUser) {
      // nếu chưa tồn tại => thêm user => login
      let newData = {
        full_name: full_name,
        email: "",
        pass_word: "",
        avatar: "",
        face_app_id: faceAppId,
        role: "user",
      };

      await model.users.create(newData);
    }
    responseData(res, "Login thành công", "token", 200);
  } catch {
    responseData(res, "Lỗi ...", "", 500);
  }
};
