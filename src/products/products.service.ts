import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) {}
    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany();
      }
      public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
          where: { id },
        });
      }
      public async deleteById(id: Product['id']): Promise<Product> {
        try {
          await this.prismaService.orderItem.deleteMany({
            where: { productId: id },
          });
      
          await this.prismaService.order.deleteMany({
            where: { productId: id },
          });
      
          await this.prismaService.colorVariant.deleteMany({
            where: { productId: id },
          });
      
          return await this.prismaService.product.delete({
            where: { id },
          });
        } catch (error) {
          console.error('Error deleting product: ', error);
          throw error;
        }
      }
      public create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { colorVariants: { color: string; price: number; imageUrl: string }[] }): Promise<Product> {
        return this.prismaService.product.create({
          data: {
            name: productData.name,
            price: productData.price,
            minPrice: productData.minPrice,
            description: productData.description,
            categoryId: productData.categoryId,
            imageUrl: productData.imageUrl,
            colorVariants: {
              create: productData.colorVariants,
            },
          },
        });
      }
      public updateById(
        id: Product['id'],
        productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { colorVariants: { color: string; price: number; imageUrl: string }[] },
      ): Promise<Product> {
        return this.prismaService.product.update({
          where: { id },
          data: {
            name: productData.name,
            price: productData.price,
            minPrice: productData.minPrice,
            description: productData.description,
            categoryId: productData.categoryId,
            imageUrl: productData.imageUrl,
            colorVariants: {
              create: productData.colorVariants,
            },
          },
        });
      }
}