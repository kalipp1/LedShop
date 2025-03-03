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
          id: 'c2e707b8-ffd0-494b-92cd-c6d2e03e82b4',
          color: 'Red',
          price: 50,
          imageUrl: "/uploads/products/led-strip-red.png"
        },
        {
          id: 'd8221698-509d-4de5-b6f8-25ee02591dbe',
          color: 'Green',
          price: 50,
          imageUrl: "/uploads/products/led-strip-green.png"
        },
        {
          id: '74dccd27-6dfb-4bb7-abbe-fb69ebc060c8',
          color: 'Blue',
          price: 30,
          imageUrl: "/uploads/products/led-strip-blue.png"
        },
        {
          id: '10e7563c-7dbe-4f80-aaa2-f3ec6a771ede',
          color: 'White',
          price: 30,
          imageUrl: "/uploads/products/led-strip-main.png"
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
      imageUrl: "/uploads/products/led-bulb-main.png",
      colorVariants: [
        {
          id: 'e69c5bec-8642-4498-826c-4e74efbdb0e8',
          color: 'RGB',
          price: 30,
          imageUrl: "/uploads/products/led-bulb-RGB.png"
        },
        {
          id: '138fff4e-25fd-4a99-8f38-50ec30557287',
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
      description: 'Plug in and ready, Beautiful color, Big variety',
      categoryId: "dcd8d654-0b9a-48f0-a19c-9aa9c45c968a",
      imageUrl: "/uploads/products/led-neon-stand-main.png",
      colorVariants: [
        {
          id: 'ca41d86b-4804-4f60-bb35-d4ff21ebb75d',
          color: 'RGB',
          price: 70,
          imageUrl: "/uploads/products/led-neon-stand-RGB.png"
        },
        {
          id: '709e9f34-2514-4c61-b0c6-d3aeb9f98ac9',
          color: 'Red',
          price: 60,
          imageUrl: "/uploads/products/led-neon-stand-red.png"
        },
        {
          id: 'b02ef145-9649-46a4-a7ed-a42cff5b7518',
          color: 'Green',
          price: 60,
          imageUrl: "/uploads/products/led-neon-stand-green.png"
        },
        {
          id: '7e46c361-49e3-45f4-a60b-7a2d8bdee8c1',
          color: 'Blue',
          price: 60,
          imageUrl: "/uploads/products/led-neon-stand-blue.png"
        },
        {
          id: 'a4e3faf9-c93a-40e1-9b7d-be75bde2559f',
          color: 'White',
          price: 55,
          imageUrl: "/uploads/products/led-neon-stand-main.png"
        },
        {
          id: '4b90249d-45c8-442f-bd1e-c2d6751e4be4',
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
        { id: '1712608e-efee-4f1d-8750-ab841bc6a938', name: 'Led Hex Panels' },
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
        const createdProduct = await db.product.create({
          data: {
            id: product.id,
            name: product.name,
            price: product.price,
            minPrice: product.minPrice,
            description: product.description,
            categoryId: product.categoryId,
            imageUrl: product.imageUrl,
          },
        });
  
        const createdVariants = await Promise.all(
          product.colorVariants.map(async (variant) => {
            return await db.colorVariant.create({
              data: {
                id: variant.id,
                color: variant.color,
                price: variant.price,
                imageUrl: variant.imageUrl,
                productId: createdProduct.id,
              },
            });
          })
        );
  
        console.log(`Product added: ${createdProduct.name} with ${createdVariants.length} variants.`);
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