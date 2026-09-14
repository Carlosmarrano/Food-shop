import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, ShiftStatus } from 'src/delivery/entities/delivery.entity';
import { foodStatus, Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
    ) { }

    async getGlobalMetrics() {

        const DailyRevenue = await this.orderRepository.createQueryBuilder("order")
            .select("SUM(order.total)", "sum")
            .where("order.status = :status", { status: foodStatus.delivered })
            .getRawOne();

        const activeOrdersCount = await this.orderRepository.count({
            where: { status: foodStatus.pending },
        });

        const ActiveDelivery = await this.deliveryRepository.count({
            where: { status: ShiftStatus.online },
        });

        return [
            {
                title: "INGRESOS DEL DÍA",
                value: `$${Number(DailyRevenue?.sum || 0).toFixed(2)}`,
            },
            {
                title: "PEDIDOS EN RUTA",
                value: `${activeOrdersCount} Activos`,
            },
            {
                title: "REPARTIDORES CONECTADOS",
                value: `${ActiveDelivery} Motorizados`,
            },
        ];
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