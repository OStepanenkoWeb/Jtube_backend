import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeOrmConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	port: configService.get<number>('TYPEORM_PORT'),
	database: configService.get<string>('TYPEORM_DATABASE'),
	username: configService.get<string>('TYPEORM_USERNAME'),
	password: configService.get<string>('TYPEORM_PASSWORD'),
	autoLoadEntities: true,
	synchronize: true,
	logging: true,
})
