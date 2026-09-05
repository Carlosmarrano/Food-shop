import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_HOST !== "localhost" && process.env.DB_HOST !== "127.0.0.1",
      extra: {
        ssl: process.env.DB_HOST !== "localhost" && process.env.DB_HOST !== "127.0.0.1" ? { rejectUnauthorized: false } : false,
      },
    }),
    FoodModule,

    CommonModule,

    SeedModule,

    AuthModule,

    OrdersModule,

    UsersModule,
  ],

})
export class AppModule { }
