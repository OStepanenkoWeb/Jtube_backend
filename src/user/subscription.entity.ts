import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { CustomBaseEntity } from '../utils/db/custom.base.entity'
import { UserEntity } from './user.entity'
import { VideoEntity } from '../video/video.entity'

@Entity('Subscription')
export class SubscriptionEntity extends CustomBaseEntity {
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn({ name: 'from_user_id' })
	fromUser: UserEntity

	@OneToMany(() => VideoEntity, video => video.author)
	@JoinColumn({ name: 'to_channel_id' })
	toChannel: UserEntity
}
