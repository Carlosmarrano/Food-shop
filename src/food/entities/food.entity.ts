import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FoodImage } from "./food_image.entity";
import { User } from "src/auth/entities/user.entity";

@Entity({ name: 'foods' })
export class Food {
 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true
    })
    title: string;

    @Column({
        type: 'text',
        unique: true
    })
    description: string;

    @Column({
        type: 'text',
        unique: true
    })
    slug: string;

    @Column({
        type: 'float',
        default: 0
    })
    price: number;

    @Column({
        type: "int",
        default : 0
    })
    stock: number;

    @OneToMany(
        () => FoodImage,
        (foodImage) => foodImage.food,
        { cascade: true, eager: true }
    )
    images?: FoodImage[];

    @ManyToOne(
        () => User,
        (user) => user.food,
        {eager: true }
    )
    user: User;
 
    @BeforeInsert()
    chechkSlugInsert(){
        if(!this.slug){
            this.slug = this.title;
        }

        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'",'')
    }
}