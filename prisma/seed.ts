import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Led Strip',
      price: 50,
      minPrice: 30,
      description: 'Cheap, ideal for beginners with working on lightings',
      categoryId: "???",
      imageUrl: "???",
      colorVariants: [
        {
          color: 'Red',
          price: 50,
        },
        {
          color: 'Green',
          price: 50,
        },
        {
          color: 'White',
          price: 30,
        },
      ],
    },
    {
        id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
        name: 'Led Bulb',
        price: 30,
        minPrice: 15,
        description: 'Easy installation, own application on mobile phone',
        categoryId: "???",
        imageUrl: "???",
        colorVariants: [
          {
            color: 'RGB',
            price: 30,
          },
          {
            color: 'White',
            price: 15,
          },
        ],
      },
      {
        id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
        name: 'Led Neon Standing Light',
        price: 70,
        minPrice: 55,
        description: 'Plug in and ready, Beatiful color, Big variety',
        categoryId: "???",
        imageUrl: "???",
        colorVariants: [
          {
            color: 'RGB',
            price: 70,
          },
          {
            color: 'Red',
            price: 60,
          },
          {
            color: 'Green',
            price: 60,
          },
          {
            color: 'Blue',
            price: 60,
          },
          {
            color: 'White',
            price: 55,
          },
          {
            color: 'Custom',
            price: 85,
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
                create: product.colorVariants.map((variant) => ({
                  color: variant.color,
                  price: variant.price,
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
}

seed();