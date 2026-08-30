import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from "path";

@Module({
  imports: [
    ConfigModule.forRoot(),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveRoot: "/static"
    }),

    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
        ssl: process.env.DB_HOST !== "localhost" && process.env.DB_HOST !== "127.0.0.1" ? { rejectUnauthorized: false } : false,
    }),
    FoodModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    OrdersModule,
  ],

})
export class AppModule {}
