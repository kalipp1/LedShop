import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class OrdersService {
    constructor(
        private prismaService: PrismaService,
        private clientsService: ClientsService,
    ) {}
    public getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany({ include: { product: true, client: true } });
      }
    public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({
            where: { id },
            include: { product: true, client: true },
        });
    }
    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({
            where: { id },
        })
    }
    public async create(
        orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & { client?: { name: string; email: string; address: string } },
      ): Promise<Order> {
        const { clientId, productId, client: clientData, ...otherData } = orderData;

        let finalClientId = clientId;
        
    if (!clientId) {
      if (!clientData?.email || !clientData?.name || !clientData?.address) {
        throw new BadRequestException('Client data is incomplete');
      }
      const newClient = await this.clientsService.create(clientData);
      finalClientId = newClient.id;
    } else {
      const existingClient = await this.clientsService.getById(clientId);
      if (!existingClient) {
        throw new BadRequestException("Client doesn't exist");
      }
    }
        if (!finalClientId || !productId) {
            throw new BadRequestException("clientId and productId cannot be null or undefined");
        }
        try {
          return await this.prismaService.order.create({
            data: {
              ...otherData,
              product: {
                connect: { id: productId },
              },
              client : {
                connect: { id: finalClientId }
            }
            },
          });
        } catch (error: unknown) {
          if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
            throw new BadRequestException("Product doesn't exist");
          }
          throw error;
        }
      }
}