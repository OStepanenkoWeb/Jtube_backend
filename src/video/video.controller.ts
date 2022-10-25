import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { VideoService } from './video.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decortors/user.decorator'
import { VideoDto } from './video.dto'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@Param('id') id: string) {
		return this.videoService.findVideoById(Number(id))
	}

	@Get()
	async searchVideo(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getVideo(searchTerm)
	}

	@Get('most-popular')
	async mostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@Get(':id')
	async getVideoById(@Param('id') id: string) {
		return this.videoService.findVideoById(Number(id))
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('id') id: number) {
		return this.videoService.create(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.updateVideo(Number(id), dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.deleteVideo(Number(id))
	}

	@HttpCode(200)
	@Put('update-views/:id')
	async updateViewsVideo(@Param('id') id: string) {
		return this.videoService.updateCountViews(Number(id))
	}

	@HttpCode(200)
	@Put('update-likes/:id')
	async updateLikesVideo(@Param('id') id: string) {
		return this.videoService.updateCountLikes(Number(id))
	}
}
