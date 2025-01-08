import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UrlCreateDto {
	@ApiProperty({
		description: 'Original URL',
		example: 'https://example.com',
		required: true
	})
	@IsString()
	@IsNotEmpty({
		message: 'URL is required'
	})
	originalUrl: string

	@ApiProperty({
		description: 'The date the URL will expire',
		example: '2021-12-31T23:59:59Z',
		required: false
	})
	expiresAt?: Date
}

export class UrlUpdateDto extends UrlCreateDto {
	@ApiProperty({
		description: 'The ID of the url',
		example: '1'
	})
	@IsString()
	@IsNotEmpty({
		message: 'ID is required'
	})
	id: number
}
