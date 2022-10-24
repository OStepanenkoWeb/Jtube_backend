import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './decortors/user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.findUserById(id)
	}

	@Get('channel/:id')
	@Auth()
	async getUser(@Param('id') id: string) {
		return this.userService.findUserById(Number(id))
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(Number(id), dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribeToChannel(
		@CurrentUser('id') id: number,
		@Param('channelId') channelId: string,
	) {
		return this.userService.subscribe(id, Number(channelId))
	}

	@Get()
	async getUsersAll() {
		return this.userService.getAll()
	}
}
