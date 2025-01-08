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
	shortUrl: string
	expiresAt: Date
}

export class UrlUpdateResponseDto extends UrlCreateResponseDto {}
