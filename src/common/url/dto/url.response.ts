export class UrlDto {
	id: number
	originalUrl: string
	shortUrl: string
	expiresAt: Date
	clickCount: number
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

export class UrlCreateResponseDto {
	id: number
	shortUrl: string
	expiresAt: Date
	createdAt: Date
}

export class UrlUpdateResponseDto extends UrlCreateResponseDto {
	updatedAt: Date
}
