import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '../utils/db/custom.base.entity'
import { UserEntity } from './user.entity'

@Entity('Subscription')
export class SubscriptionEntity extends CustomBaseEntity {
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@OneToMany(() => UserEntity, video => video.subscriptions)
	@JoinColumn({ name: 'to_channel_id' })
	toChannel: UserEntity
}
