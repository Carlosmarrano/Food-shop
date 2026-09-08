import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { Delivery } from "src/delivery/entities/delivery.entity";

export enum foodStatus {
    pending = "PENDING",
    inKitchen = "IN_KITCHEN",
    inDelivery = "IN_DELIVERY",
    delivered = "DELIVERED",
    cancelled = "CANCELLED",
}

@Entity({ name: "orders" })
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "enum",
        enum: foodStatus,
        default: foodStatus.pending
    })
    status: foodStatus;

    @Column({
        type: "float",
        default: 0
    })
    total: number;

    @Column("text")
    address: string;

    @Column("text", { nullable: true })
    reference?: string;

    @Column("text")
    phone: string;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @ManyToOne(
        () => Delivery,
        (delivery) => delivery.orders,
        {
            nullable: true,
            onDelete: "SET NULL"
        })
    delivery?: Delivery;

    @ManyToOne(
        () => User,
        (user) => user.id,
        { eager: true }
    )
    user: User;

    @OneToMany(
        () => OrderItem,
        (orderItem) => orderItem.order,
        {
            cascade: true,
            eager: true
        })
    items: OrderItem[];
}
