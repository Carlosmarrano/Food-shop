import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ShiftStatus {
    offline = "OFFLINE",
    online = "ONLINE",
    in_route = "IN_ROUTE",
}

@Entity({ name: 'delivery' })
export class Delivery {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar" })
    plate: string;

    @Column({ type: "text" })
    vehicle: string;

    @Column({
        type: "enum",
        enum: ShiftStatus,
        default: ShiftStatus.offline,
    })
    status: ShiftStatus;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(
        () => Order,
        (order) => order.delivery,
    )
    orders: Order[];
}