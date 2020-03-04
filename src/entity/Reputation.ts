import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';
import { Chat } from './Chat';

@Entity('reputation')
export class Reputation {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ManyToOne(
    () => User,
    user => user.reputations,
  )
  @JoinColumn()
  user: User;

  @ManyToOne(() => Chat)
  @JoinColumn()
  chat: Chat;

  @OneToOne(() => Message)
  @JoinColumn()
  message: Message;

  @Column({ default: 1 })
  value: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date | null;

  @BeforeInsert()
  onBeforeInsertHook(): void {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  onBeforeUpdateHook(): void {
    this.updatedAt = new Date();
  }
}
