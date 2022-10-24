import { Column, Entity, OneToMany } from 'typeorm'
import { VideoEntity } from '../video/video.entity'
import { CustomBaseEntity } from '../utils/db/custom.base.entity'
import { SubscriptionEntity } from './subscription.entity'

@Entity('User')
export class UserEntity extends CustomBaseEntity {
	@Column({ unique: true })
	email: string

	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: 0, name: 'subscribers_count' })
	subscribersCount?: number

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => VideoEntity, video => video.author)
	videos: VideoEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
	subscriptions: SubscriptionEntity[]

	@OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
	subscribers: SubscriptionEntity[]
}
