import { ApiProperty } from '@nestjs/swagger'
import {
	IsDateString,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator'

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
		description: 'Custom Alias URL',
		example: 'bg3k54/custom-alias',
		required: false
	})
	@IsString()
	@IsOptional()
	@MaxLength(20, {
		message: 'Alias cannot be longer than 20 characters'
	})
	alias?: string

	@ApiProperty({
		description: 'The date the URL will expire',
		example: '2025-01-10T23:59:59Z',
		required: false
	})
	@IsOptional()
	@IsDateString()
	expiresAt?: Date
}
