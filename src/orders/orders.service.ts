import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private prismaService: PrismaService,
        private clientsService: ClientsService,
    ) {}
    public getAll(): Promise<Order[]> {
      return this.prismaService.order.findMany({
          include: { items: { include: { product: true, colorVariant: true } }, client: true }
      });
  }
  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
        where: { id },
        include: { items: { include: { product: true, colorVariant: true } }, client: true },
    });
}
public async deleteById(id: Order['id']): Promise<Order> {
  return this.prismaService.order.delete({
      where: { id },
  });
}

public async create(orderData: CreateOrderDTO): Promise<Order> {
  const { clientId, client: clientData, items } = orderData;
  let finalClientId = clientId;

  if (!clientId) {
      if (!clientData?.email || !clientData?.name || !clientData?.address) {
          throw new BadRequestException('Client data is incomplete');
      }
      const newClient = await this.clientsService.create({
          name: clientData.name,
          email: clientData.email,
          address: clientData.address,
          phone: clientData.phone || null,
      });
      finalClientId = newClient.id;
  } else {
      const existingClient = await this.clientsService.getById(clientId);
      if (!existingClient) {
          throw new BadRequestException("Client doesn't exist");
      }
  }

  if (!items.length) {
      throw new BadRequestException("Order must contain at least one item.");
  }

  try {
      return await this.prismaService.order.create({
          data: {
              client: { connect: { id: finalClientId } },
              items: {
                  create: items.map(item => ({
                      product: { connect: { id: item.productId } },
                      colorVariant: { connect: { id: item.colorVariantId } },
                      quantity: item.quantity
                  })),
              }
          },
          include: { items: { include: { product: true, colorVariant: true } }, client: true }
      });
  } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
          throw new BadRequestException("One of the products or variants doesn't exist");
      }
      throw error;
  }
}
}