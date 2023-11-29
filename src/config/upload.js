import multer from "multer";

let storage = multer.diskStorage({
  destination: process.cwd() + "/public/imgs", // nơi định nghĩa đường dẫn lưu hình
  filename: (req, file, callback) => {
    // let newName = Date.now();
    let newName = new Date().getTime() + "_" + file.originalname; // meo.jpeg
    callback(null, newName); // 1704xxx_meo.jpeg
  }, // đổi tên hình
});

let upload = multer({ storage: storage });

export default upload;
