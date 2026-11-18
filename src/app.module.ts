import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, OrdersModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
