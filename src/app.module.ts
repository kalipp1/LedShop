import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import * as cors from 'cors';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './shared/services/prisma.service';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { AdminModule } from './admin/admin.module';
import { AuthMiddleware } from './utils/authMiddleware';

@Module({
  imports: [ProductsModule, OrdersModule, ClientsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware)
    .exclude(
      { path: 'admin/login', method: RequestMethod.POST },
      { path: 'orders/:id', method: RequestMethod.GET },
      { path: 'orders/:id', method: RequestMethod.DELETE }
    )
    .forRoutes(
      { path: 'admin/*', method: RequestMethod.ALL },
      { path: 'orders/*', method: RequestMethod.ALL },
      { path: 'products/*', method: RequestMethod.ALL }
    );
    }
  }
