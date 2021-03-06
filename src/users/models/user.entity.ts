import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './create-user.dto';

@Entity()
export class User {
  @Exclude()
  private readonly saltRounds = 10;

  static fromCreateDto(createUserDto: CreateUserDto): User {
    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    return newUser;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column({ unique: true, nullable: true })
  @Exclude()
  token: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.saltRounds);
  }

  async isSamePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
