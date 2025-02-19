import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [ClientsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService]
})
export class OrdersModule {}
