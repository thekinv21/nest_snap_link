import { Expose } from 'class-transformer'

export class UrlDto {
	id: number
	originalUrl: string
	shortUrl: string
	expiresAt: Date
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export class UrlCreateResponseDto {
	@Expose()
	shortUrl: string

	@Expose()
	expiresAt: Date
}
