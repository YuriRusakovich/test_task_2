import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  large_photo: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  rating: number;

  constructor(
    name: string,
    photo: string,
    large_photo: string,
    login: string,
    email: string,
    phone: string,
    rating: number,
    id?: number,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.large_photo = large_photo;
    this.login = login;
    this.email = email;
    this.phone = phone;
    this.rating = rating;
  }
}
