import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    mobile: string;

    @Column('text')
    committee: string;

    constructor(name,email,mobile,committee){
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.committee = committee;
  }
}
