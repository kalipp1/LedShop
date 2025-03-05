import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
    constructor(private prismaService: PrismaService) {}
    private deleteFile(filePath: string) {
      if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
              if (err) console.error(`Error deleting file: ${filePath}`, err);
              else console.log(`Deleted file: ${filePath}`);
          });
      }
    }
    public getAll(): Promise<Product[]> {
        return this.prismaService.product.findMany({
          include: {
            colorVariants: true,
          },
        });
      }
      public getById(id: Product['id']): Promise<Product | null> {
        return this.prismaService.product.findUnique({
          where: { id },
          include: {
            colorVariants: true,
          }
        });
      }
      public async deleteById(id: Product['id']): Promise<Product> {
        try {
          const product = await this.prismaService.product.findUnique({
            where: { id },
            include: { colorVariants: true },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (product.imageUrl) {
            const mainImagePath = path.join(__dirname, '..', '..', 'public', product.imageUrl);
            this.deleteFile(mainImagePath);
        }
        product.colorVariants.forEach((variant) => {
            if (variant.imageUrl) {
                const variantImagePath = path.join(__dirname, '..', '..', 'public', variant.imageUrl);
                this.deleteFile(variantImagePath);
            }
        });
        await this.prismaService.orderItem.deleteMany({ where: { productId: id } });
        await this.prismaService.order.deleteMany({ where: { productId: id } });
        await this.prismaService.colorVariant.deleteMany({ where: { productId: id } });

        return await this.prismaService.product.delete({ where: { id } });

        } catch (error) {
          console.error('Error deleting product: ', error);
          throw error;
        }
      }
      public create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { colorVariants: { color: string; price: number; imageUrl: string }[] }): Promise<Product> {
        console.log("🔹 Dane otrzymane w backendzie:", productData);

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