import { CustomBaseEntity } from '../utils/db/custom.base.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { VideoEntity } from '../video/video.entity'

@Entity('Comment')
export class CommentEntity extends CustomBaseEntity {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => VideoEntity, video => video.comments)
	@JoinColumn({ name: 'video_id' })
	video: VideoEntity
}
