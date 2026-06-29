import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Food } from "src/food/entities/food.entity";

@Entity({name: "order_items"})
export class OrderItem{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "int"
    })
    quantity: number;

    @ManyToOne(
        () => Order,
        (order) => order.items,
        {onDelete: "CASCADE"}
    )
    order: Order;

    @ManyToOne(
        () => Food,
        (food) => food.id,
        {eager: true}
    )
    food: Food;
}