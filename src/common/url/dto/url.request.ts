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
