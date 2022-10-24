import { IsEmail } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	password: string

	@IsEmail()
	name: string

	@IsEmail()
	description: string

	@IsEmail()
	avatarPath: string
}
