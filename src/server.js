import express from "express";
import cors from "cors";
import rootRoute from "./routes/rootRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// middle ware định vị thư mục load tài nguyên
app.use(express.static("."));

// graphql
import { graphqlHTTP } from "express-graphql";

import { buildSchema } from "graphql";
// [String]: [{productId, productName}, {productId, productName}]
// [Int]: [1, 2, 3]
let schemaGraphql = buildSchema(`

    type User {
        user_id: ID
        full_name: String
        email: String
        avatar: String
        pass_word: String
        face_app_id: String
        role: String
        refresh_token: String
    }

    type VideoType {
        type_id: ID
        type_name: String
        icon: String
    }

    type Product {
        productId: ID
        productName: String
    }

    type Video {
        video_id:      Int
        video_name:    String
        thumbnail:     String
        description:   String
        views:         Int
        source:        String
        user_id:       Int
        type_id:       Int
        users: User
        video_type: VideoType
    }

    type RootQuery {
        getUser: User
        getUserId(userId: Int, email: String, hoTen: String): User
        getVideo: [Video]
    }

    type RootMutation {
        createUser: String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }


`);

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let resolver = {
  getVideo: async () => {
    let data = await prisma.video.findMany({
      include: {
        users: true,
        video_type: true,
      },
    });

    return data;
  },
  getUser: () => {
    const data = {
      id: 1,
      userName: "long",
      age: 22,
      email: "long@long",
      product: [
        {
          productId: 1,
          productName: "sp1",
        },
      ],
    };
    return data;
  },
  getUserId: ({ userId }) => {
    const data = {
      id: userId,
      userName: "long",
      age: 22,
      email: "long@long",
      product: [
        {
          productId: 1,
          productName: "sp1",
        },
      ],
    };
    return data;
  },
  createUser: () => {
    // return "Hello world !";
  },
};

// localhost:8080/api
app.use(
  "/api",
  graphqlHTTP({
    schema: schemaGraphql, // nơi khai báo đối tượng (tên model, tên hàm)
    rootValue: resolver, // gán dữ liệu vào các hàm được khai báo ở schema
    graphiql: true,
  }),
);

// end graphql

app.listen(8080);
// localhost:8080/video/get-video
app.use(rootRoute);

// yarn add sequelize
// lưu ý cài thêm thư viện của CSDL đó song song với sequelize

// yarn add  swagger-ui-express swagger-jsdoc
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "api node 37",
      version: "1.0.0.0.0.0.0.0.0.0",
    },
  },
  apis: ["src/swagger/index.js"],
};

const specs = swaggerJsDoc(options);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

// setup prisma
// 1/ yarn add prisma @prisma/client
// 2/ yarn prisma init

// Next steps:
// 1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
// 2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
// 3. Run yarn prisma db pull to turn your database schema into a Prisma schema.
// 4. Run yarn prisma generate to generate the Prisma Client. You can then start querying your database.

// 3. Cập nhật lại chuỗi kết nối database trong .env và tên hệ CSDL đang sử dụng trong schema.prisma

// 5. Run yarn prisma generate để cập nhật model trong @prisma/client
