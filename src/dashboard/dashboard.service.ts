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
}