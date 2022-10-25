import { IsString } from 'class-validator'

export class CommentDto {
	@IsString()
	message: string

	@IsString()
	videoId: number
}
