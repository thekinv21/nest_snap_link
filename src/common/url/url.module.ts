import { PrismaService } from '@/root/prisma'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtAuthService } from '../auth/jwt/jwt.service'
import { UserService } from '../user/user.service'
import { UrlController } from './url.controller'
import { UrlService } from './url.service'

@Module({
	imports: [],
	controllers: [UrlController],
	providers: [
		PrismaService,
		UrlService,
		JwtAuthService,
		JwtService,
		UserService
	],
	exports: [UrlService]
})
export class UrlModule {}
