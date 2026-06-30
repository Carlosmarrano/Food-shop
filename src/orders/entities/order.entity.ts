import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

export enum foodStatus {
    pending = "PENDING",
    inKitchen = "IN_KITCHEN",
    inDelivery = "IN_DELIVERY",
    delivered = "DELIVERED",
    cancelled = "CANCELLED",
} 

@Entity({ name: "orders"})
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


    @ManyToOne(
        () => User,
        (user) => user.id,
        {eager: true}
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
