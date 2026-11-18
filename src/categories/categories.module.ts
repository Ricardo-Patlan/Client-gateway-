import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoriesController } from './categories.controller';
import { CATEGORY_SERVICE } from 'src/config/service';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CATEGORY_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.categoriesMicroserviceHost,
          port: envs.categoriesMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
