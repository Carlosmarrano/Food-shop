import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { foodStatus, Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) { }

    async getGlobalMetrics() {

        const totalOrders = await this.orderRepository.count();

        const completedOrders = await this.orderRepository.count({
            where: { status: foodStatus.delivered },
        });

        const activeOrders = await this.orderRepository.count({
            where: { status: foodStatus.pending }
        })

        const cancelledOrders = await this.orderRepository.count({
            where: { status: foodStatus.cancelled },
        });

        return {
            totalOrders,
            completedOrders,
            activeOrders,
            cancelledOrders,
        };
    };

    async getWeeklySales() {

        const rawSales = await this.orderRepository.createQueryBuilder("order")
            .innerJoin("order.items", "item")
            .innerJoin("item.food", "food")
            .select("food.title", "dish")
            .addSelect('SUM(food.price * item.quantity)', "totalSalesRaw")
            .groupBy("food.title")
            .orderBy('SUM(food.price * item.quantity)', 'DESC')
            .limit(5).getRawMany()

        const grandTotal = rawSales.reduce(
            (sum, item) => sum + Number(item.totalSalesRaw),
            0,
        );

        return rawSales.map((item) => {
            const totalSalesNum = Number(item.totalSalesRaw);
            const percentage = grandTotal > 0 ? Math.round((totalSalesNum / grandTotal) * 100) : 0;

            return {
                dish: item.dish,
                totalSales: `$${totalSalesNum.toFixed(2)}`,
                widthPercentage: `${percentage}%`,
            };
        });
    }
}