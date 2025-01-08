import { PrismaService } from '@/root/prisma'
import { Injectable } from '@nestjs/common'
import { UrlCreateDto, UrlUpdateDto } from './dto/url.request'
import {
	UrlCreateResponseDto,
	UrlDto,
	UrlUpdateResponseDto
} from './dto/url.response'

@Injectable()
export class UrlService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAll(): Promise<UrlDto[]> {
		return null
	}

	public async redirectToURLByShortURL(id: string): Promise<UrlDto> {
		return null
	}

	public async getInfoByShortURL(id: string): Promise<UrlDto> {
		return null
	}

	public async create(dto: UrlCreateDto): Promise<UrlCreateResponseDto> {
		return null
	}

	public async update(dto: UrlUpdateDto): Promise<UrlUpdateResponseDto> {
		return null
	}

	public async delete(shortUrl: string): Promise<void> {
		return null
	}

	public async toggle(shortUrl: string): Promise<void> {
		return null
	}

	async isUniqueURL(url: string): Promise<void> {}
}
