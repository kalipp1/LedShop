import { Controller, Get, Param, Delete, Body, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}
    @Get('/')
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
        if (!(await this.ordersService.getById(id)))
            throw new NotFoundException('Order not found');
        await this.ordersService.deleteById(id);
        return { success: true };
    }
    @Post('/')
    create(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.create(orderData);
    }
}