import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { JwtAuthService } from '../jwt/jwt.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(
		private jwt: JwtService,
		private envConfig: ConfigService,
		private jwtAuth: JwtAuthService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.extractAccessToken(request)
		if (!token) {
			throw new UnauthorizedException("Oops! You're not authorized...")
		}

		try {
			const payload = await this.jwt.verifyAsync(token, {
				secret: this.envConfig.get('JWT_SECRET')
			})
			request['user'] = payload
		} catch {
			throw new UnauthorizedException("Oops! You're not authorized...")
		}
		return true
	}

	private extractAccessToken(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? []
		return type === 'Bearer' ? token : undefined
	}
}
