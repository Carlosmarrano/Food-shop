import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { Food } from "src/food/entities/food.entity";

@Entity({ name: "orders"})
export class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: "text", 
        default: "PENDING"})
    status: string;

    @Column({
        type: "float",
        default: 0
    })
    total: number;

    @ManyToOne(
        () => Food,
        (food) => food.id,
        { eager: true }
    )
    OrderDetail: Food;

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
