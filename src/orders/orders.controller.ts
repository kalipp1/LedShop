import { Controller, Get, Param, Delete, Body, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Get('/')
    @UseGuards(AdminGuard)
    getAll(): any {
        return this.ordersService.getAll();   
    }
    @Get('/:id')
    async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const ord = await this.ordersService.getById(id);
        if (!ord) throw new NotFoundException('Order not found');
        return ord;
    }
    @Delete('/:id')
    async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = await this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        
        await this.ordersService.deleteById(id);
        return { message: 'Order canceled successfully' };
    }
    @Post('/')
    async create(@Body() orderData: CreateOrderDTO) {
        try {
            const order = await this.ordersService.create(orderData);
            return { 
                message: 'Order placed successfully!', 
                orderId: order.id
            };
        } catch (error) {
            console.error(error);
            throw new HttpException('Error creating order', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}