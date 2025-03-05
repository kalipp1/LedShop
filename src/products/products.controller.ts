import { Controller, Get, Param, Delete, Post, Body, Put, UseGuards, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Product } from '@prisma/client';
import { diskStorage } from 'multer';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';

interface ColorVariantDTO {
  color: string;
  price: number;
  imageUrl?: string;
}

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
    @Get('/')
    getAll(): any {
        return this.productsService.getAll();   
    }
    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Omit<Product, 'createdAt' | 'updatedAt'> & { colorVariants: { color: string; price: number; imageUrl: string }[] }> {
        const prod = await this.productsService.getById(id);
        if (!prod) throw new NotFoundException('Product not found');
        return prod;
    }
    @Delete('/:id')
    @UseGuards(AdminGuard)
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
        throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
    }
    
    @Delete('/:productId/variants/:variantId')
    @UseGuards(AdminGuard)
    async deleteVariant(
      @Param('productId', new ParseUUIDPipe()) productId: string,
      @Param('variantId', new ParseUUIDPipe()) variantId: string
    ) {
      const product = await this.productsService.getById(productId);
      if (!product) throw new NotFoundException('Product not found');
    
      const variantExists = product.colorVariants.some(variant => variant.id === variantId);
      if (!variantExists) throw new NotFoundException('Variant not found');
    
      try {
          await this.productsService.deleteVariantById(variantId);
          return { success: true, message: 'Variant deleted successfully' };
      } catch (error) {
          console.error("Error deleting variant:", error);
          throw new NotFoundException('Error deleting variant');
      }
    }

    @UseGuards(AdminGuard)
    @Post('/')
    @UseInterceptors(
      AnyFilesInterceptor({
        storage: diskStorage({
          destination: './public/uploads/products',
          filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
          },
        }),
      }),
    )
    async create(
    @Body() productData: any, 
    @UploadedFiles() files: Express.Multer.File[],
    ) {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
      }

    const mainImage = files.find(f => f.fieldname === 'image');
    const variantImages = files.filter(f => f.fieldname === 'variantImages');

    if (!mainImage) {
      throw new BadRequestException('Main image is required');
    }

    let parsedColorVariants: ColorVariantDTO[];
    try {
      parsedColorVariants = typeof productData.colorVariants === 'string' 
        ? JSON.parse(productData.colorVariants) 
        : productData.colorVariants;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new BadRequestException('Invalid JSON format in colorVariants');
    }

    if (!Array.isArray(parsedColorVariants) || parsedColorVariants.length === 0) {
      throw new BadRequestException('At least one color variant is required');
    }

    const updatedColorVariants = parsedColorVariants.map((variant: ColorVariantDTO, index: number) => ({
      color: variant.color,
      price: variant.price,
      imageUrl: `/uploads/products/${variantImages[index]?.filename || ''}`,
    }));

    const product = await this.productsService.create({
      name: productData.name,
      price: Number(productData.price),
      minPrice: Number(productData.minPrice),
      description: productData.description,
      categoryId: productData.categoryId,
      imageUrl: `/uploads/products/${mainImage.filename}`,
      colorVariants: updatedColorVariants,
    });

    return product;
  }
    @Put('/:id')
    @UseGuards(AdminGuard)
    async update(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() productData: UpdateProductDTO,
    ) {
      if (!(await this.productsService.getById(id)))
        throw new NotFoundException('Product not found');
  
      await this.productsService.updateById(id, productData);
      return { success: true };
    }
    
}