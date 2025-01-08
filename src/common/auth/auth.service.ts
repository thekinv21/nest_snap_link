import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import { plainToInstance } from 'class-transformer'
import { UUID } from 'crypto'

import { PrismaService } from '@/root/prisma'
import { UserDto } from '../user/dto/user.response'
import { UserService } from '../user/user.service'
import { LoginDto, RefreshTokenDto, RegisterDto } from './dto/auth.request'
import { AuthResponse, TokenResponse } from './dto/auth.response'
import { JwtAuthService } from './jwt/jwt.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtAuthService,
		private readonly userService: UserService
	) {}

	async getProfile(id: UUID): Promise<UserDto> {
		return await this.userService.getById(id)
	}

	async register(dto: RegisterDto): Promise<UserDto | null> {
		const newUser = await this.prismaService.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})

		return plainToInstance(UserDto, newUser)
	}

	async login(dto: LoginDto): Promise<AuthResponse> {
		const user = await this.validateUser(dto)

		return null
	}

	async refreshToken(dto: RefreshTokenDto): Promise<TokenResponse> {
		const tokens = await this.jwtService.getNewTokens(dto)
		return tokens
	}

	async validateUser(dto: LoginDto) {
		const user = await this.prismaService.user.findUnique({
			where: {
				username: dto.username?.toLowerCase()
			}
		})

		if (!user) throw new NotFoundException('User is not found!')

		const isValid = await verify(user?.password, dto.password)

		if (!isValid) {
			throw new UnauthorizedException('Invalid Credentials')
		}

		return plainToInstance(UserDto, user)
	}
}
