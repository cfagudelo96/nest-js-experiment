import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

import { User } from '@nest-experiment/users/user.entity';

import { RoleEnum } from './roles.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.STUDENT]
  })
  role: RoleEnum;

  @ManyToOne(() => User, user => user.roles)
  user: User;
}
