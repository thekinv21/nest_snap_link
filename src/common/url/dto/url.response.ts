import { PickType } from '@nestjs/mapped-types'

export class UrlDto {
	id: number
	originalUrl: string
	shortUrl: string
	expiresAt: Date
	isActive: boolean
	createdAt: Date
	clickCount: number
}

export class UrlInfoDto extends PickType(UrlDto, [
	'originalUrl',
	'createdAt',
	'clickCount',
	'expiresAt'
]) {}
