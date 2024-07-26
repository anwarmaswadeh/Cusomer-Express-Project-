import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity('customer')
export class Customer extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length:255, nullable:false})
    customerName: string

    @Column({length:255, nullable:false, unique: true })
    mobilePhone: string

    @Column({type: "float", nullable:false, })
    balance: number
}