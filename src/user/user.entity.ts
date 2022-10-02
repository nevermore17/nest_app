import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  nickName: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  mail: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Column({ type: 'varchar', length: 100, unique: false , nullable: true})
  firstName: string;

  @Column({ type: 'varchar', length: 100, unique: false , nullable: true})
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
