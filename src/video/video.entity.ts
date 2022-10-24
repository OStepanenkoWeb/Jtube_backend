import { Entity, ManyToOne, OneToMany, Column, JoinColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { CustomBaseEntity } from '../utils/db/custom.base.entity'
import { CommentEntity } from '../comment/comment.entity'

@Entity('Video')
export class VideoEntity extends CustomBaseEntity {
	@Column()
	name: string

	@Column({ default: false, name: 'is_public' })
	isPublic: boolean

	@Column({ default: 0, name: 'views_count' })
	viewsCount?: number

	@Column({ default: 0, name: 'likes_count' })
	likesCount?: number

	@Column({ default: 0 })
	durations?: number

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'video_path' })
	videoPath: string

	@Column({ default: '', name: 'thumbnail_path' })
	thumbnailPath: string

	@ManyToOne(() => UserEntity, user => user.videos)
	@JoinColumn({ name: 'user_id' })
	author: UserEntity[]

	@OneToMany(() => CommentEntity, comment => comment.video)
	comments: CommentEntity[]
}
