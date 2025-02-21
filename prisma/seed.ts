import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();
import * as bcrypt from "bcrypt";

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Led Strip',
      price: 50,
      minPrice: 30,
      description: 'Cheap, ideal for beginners with working on lightings',
      categoryId: 'f930e19d-a622-4bdd-8ba6-dbbf98124e21',
      imageUrl: "/uploads/products/led-strip-main.png",
      colorVariants: [
        {
          color: 'Red',
          price: 50,
          imageUrl: "/uploads/products/led-strip-red.png"
        },
        {
          color: 'Green',
          price: 50,
          imageUrl: "/uploads/products/led-strip-green.png"
        },
        {
          color: 'Blue',
          price: 30,
          imageUrl: "/uploads/products/led-strip-blue.png"
        },
      ],
    },
    {
        id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
        name: 'Led Bulb',
        price: 30,
        minPrice: 15,
        description: 'Easy installation, own application on mobile phone',
        categoryId: "8e5282b1-a7b6-4172-b88e-eddd78e6f62f",
        imageUrl: "/uploads/products/led-bulb-main.jpg",
        colorVariants: [
          {
            color: 'RGB',
            price: 30,
            imageUrl: "/uploads/products/led-bulb-RGB.png"
          },
          {
            color: 'White',
            price: 15,
            imageUrl: "/uploads/products/led-bulb-main.png"
          },
        ],
      },
      {
        id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
        name: 'Led Neon Standing Light',
        price: 70,
        minPrice: 55,
        description: 'Plug in and ready, Beatiful color, Big variety',
        categoryId: "dcd8d654-0b9a-48f0-a19c-9aa9c45c968a",
        imageUrl: "/uploads/products/led-neon-stand-main.png",
        colorVariants: [
          {
            color: 'RGB',
            price: 70,
            imageUrl: "/uploads/products/led-neon-stand-RGB.png"
          },
          {
            color: 'Red',
            price: 60,
            imageUrl: "/uploads/products/led-neon-stand-red.png"
          },
          {
            color: 'Green',
            price: 60,
            imageUrl: "/uploads/products/led-neon-stand-green.png"
          },
          {
            color: 'Blue',
            price: 60,
            imageUrl: "/uploads/products/led-neon-stand-blue.png"
          },
          {
            color: 'White',
            price: 55,
            imageUrl: "/uploads/products/led-neon-stand-main.png"
          },
          {
            color: 'Custom',
            price: 85,
            imageUrl: "/uploads/products/led-neon-stand-custom.png"
          },
        ],
      },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: '5a429f93-939d-4500-9bfe-dfa3324e7885',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
      productId: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'c4d8f1f1-4f72-47a7-8db7-c5ed0b1f72b7',
      name: 'John Doe',
      email: 'Doe123@gmail.com',
      address: 'Poland, Warsaw, 123',
    },
    {
      id: 'a392d9e3-cb7a-4ec3-973e-ef33f70a72db',
      name: 'Amanda Cerny',
      email: 'amanda.cerny@gmail.com',
      phone: '987 242 212',
      address: 'Poland, Cracow, 456',
    },
    {
      id: '5a429f93-939d-4500-9bfe-dfa3324e7885',
      name: 'Christian Bale',
      email: 'christianB@gmail.com',
      phone: '789 012 984',
      address: 'England, London, 78',
    },
  ];
}

async function seed() {

    const categories = [
        { id: 'f930e19d-a622-4bdd-8ba6-dbbf98124e21', name: 'Strips' },
        { id: '8e5282b1-a7b6-4172-b88e-eddd78e6f62f', name: 'Bulbs' },
        { id: 'dcd8d654-0b9a-48f0-a19c-9aa9c45c968a', name: 'Neon Standing Lights' },
      ];

      await Promise.all(
        categories.map(async (category) => {
          const existingCategory = await db.category.findUnique({
            where: { id: category.id },
          });
          if (!existingCategory) {
            await db.category.create({ data: category });
          }
        })
      );
    
  await Promise.all(
    getClients().map(async (client) => {
      const existingClient = await db.client.findUnique({
        where: { id: client.id },
      });
      if (!existingClient) {
        await db.client.create({ data: client });
      }
    })
  );

  await Promise.all(
    getProducts().map(async (product) => {
      const existingProduct = await db.product.findUnique({
        where: { id: product.id },
      });
      if (!existingProduct) {
        await db.product.create({
          data: {
            id: product.id,
            name: product.name,
            price: product.price,
            minPrice: product.minPrice,
            description: product.description,
            categoryId: product.categoryId,
            imageUrl: product.imageUrl,
            colorVariants: {
              create: product.colorVariants.map(variant => ({
                color: variant.color,
                price: variant.price,
                imageUrl: variant.imageUrl,
              })),
            },
          },
        });
      }
    })
  );

  await Promise.all(
    getOrders().map(async ({ clientId, productId, ...orderData }) => {
      const existingOrder = await db.order.findUnique({
        where: { id: orderData.id },
      });
      if (!existingOrder) {
        await db.order.create({
          data: {
            ...orderData,
            product: {
              connect: { id: productId },
            },
            client: {
              connect: { id: clientId },
            },
          },
        });
      }
    })
  );

  const existingAdmin = await db.admin.findFirst();
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.admin.create({
      data: {
        login: "admin",
        password: hashedPassword,
      },
    });
    console.log("Admin account created! Login: admin, Password: admin123");
  } else {
    console.log("Admin already exists, skipping...");
  };
}

seed();