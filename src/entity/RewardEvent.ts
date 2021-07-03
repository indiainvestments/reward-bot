import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RewardEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column()
  rewardee: string;

  @Column()
  rewarder: string;

  @Column()
  channel: string;

  @Column({ type: 'int' })
  karma: number;
}
