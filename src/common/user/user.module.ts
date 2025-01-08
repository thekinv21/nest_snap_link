import { PrismaService } from '@/root/prisma'
import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtAuthService } from '../auth/jwt/jwt.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [],
	controllers: [UserController],
	providers: [PrismaService, UserService, JwtAuthService, JwtService],
	exports: [UserService]
})
export class UserModule {}
