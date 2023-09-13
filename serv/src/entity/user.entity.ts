import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'Ivan', description: 'user name' })
  @Column({ type: 'varchar', width: 30 })
  name: string;

  @ApiProperty({ example: 'ivan@gmail.com', description: 'email' })
  @Column({ type: 'varchar', width: 100, unique: true })
  email: string;

  @ApiProperty({ example: 'ivan2005', description: 'password' })
  @Column({ type: 'varchar', width: 255 })
  password: string;

  @ApiProperty({ example: 'photo.jpeg', description: 'user avatar' })
  @Column({ type: 'varchar', width: 255, nullable: true })
  avatar: string;
}
