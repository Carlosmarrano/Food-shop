import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Food } from "./food.entity";


@Entity({ name: 'food_images' }) 
export class FoodImage {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text'
    })
    url: string;

    @ManyToOne(
        () => Food,
        (food) => food.images,
        {onDelete: 'CASCADE'}
    )
    food: Food;
}