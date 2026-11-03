import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDER_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
