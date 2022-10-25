import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { VideoEntity } from './video.entity'
import { VideoDto } from './video.dto'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videoRepository: Repository<VideoEntity>,
	) {}

	//by-id
	async findVideoById(id: number, isPublic = false) {
		const whereData = isPublic ? { id, isPublic: true } : { id }
		const video = await this.videoRepository.findOne({
			where: whereData,
			relations: {
				author: true,
				comments: {
					user: true,
				},
			},
			select: {
				author: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true,
					subscriptions: true,
				},
				comments: {
					message: true,
					id: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						isVerified: true,
						subscriptions: true,
					},
				},
			},
		})

		if (!video) throw new NotFoundException('Видео не найдено')

		return video
	}
	//update
	async updateVideo(id: number, dto: VideoDto) {
		const video = await this.findVideoById(id)

		return this.videoRepository.save({
			...video,
			...dto,
		})
	}

	async getVideo(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

		if (searchTerm) {
			options = { name: ILike(`%${searchTerm}%`) }
		}

		return this.videoRepository.find({
			where: {
				...options,
				isPublic: true,
			},
			order: {
				createdAt: 'DESC',
			},
			relations: {
				author: true,
				comments: {
					user: true,
				},
			},
			select: {
				author: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
				},
			},
		})
	}

	async getMostPopularByViews() {
		return this.videoRepository.find({
			where: {
				viewsCount: MoreThan(0),
			},
			relations: {
				author: true,
			},
			select: {
				author: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
				},
			},
			order: {
				viewsCount: -1,
			},
		})
	}

	async create(userId: number) {
		const defaultValue = {
			name: '',
			user: { id: userId },
			videoPath: '',
			description: '',
			thumbnailPath: '',
		}

		const newVideo = this.videoRepository.create(defaultValue)
		const video = await this.videoRepository.save(newVideo)

		return video.id
	}

	async deleteVideo(id: number) {
		return this.videoRepository.delete({ id })
	}

	async updateCountViews(id: number) {
		const video = await this.findVideoById(id)

		video.viewsCount++

		return this.videoRepository.save(video)
	}

	async updateCountLikes(id: number) {
		const video = await this.findVideoById(id, true)

		video.likesCount++

		return this.videoRepository.save(video)
	}
}
