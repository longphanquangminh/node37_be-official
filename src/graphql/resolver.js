import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export let resolver = {
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
