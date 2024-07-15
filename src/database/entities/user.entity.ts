import { InternalServerErrorException } from '@nestjs/common';
import { RoleEnum } from 'src/enums/role.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 14, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 14, nullable: false, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  uf: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  district: string;

  @Column({ type: 'enum', nullable: false, default: RoleEnum.owner })
  role: RoleEnum;

  @Column({ type: 'boolean', nullable: false, default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async passwordHash() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error with password hash.');
    }
  }
}
