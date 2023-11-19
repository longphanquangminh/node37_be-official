import express from 'express';
import cors from 'cors';
import rootRoute from './routes/rootRoutes.js';

const app = express();
app.use(express.json())
app.use(cors());
app.listen(8080);
// localhost:8080/video/get-video
app.use(rootRoute);




// yarn add sequelize
// lưu ý cài thêm thư viện của CSDL đó song song với sequelize