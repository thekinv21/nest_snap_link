import { PickType } from '@nestjs/mapped-types'

export class UrlDto {
	id: number
	originalUrl: string
	shortUrl: string
	expiresAt: Date
	isActive: boolean
	createdAt: Date
	clickCount: number
	analytics: any
}

export class UrlInfoDto extends PickType(UrlDto, [
	'originalUrl',
	'createdAt',
	'clickCount',
	'expiresAt'
]) {}

export class UrlAnalyticsDto extends PickType(UrlDto, [
	'clickCount',
	'analytics'
]) {}
