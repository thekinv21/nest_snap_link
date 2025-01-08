import { PrismaService } from '@/root/prisma'
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { randomBytes } from 'crypto'
import { UrlCreateDto } from './dto/url.request'
import { UrlDto } from './dto/url.response'

@Injectable()
export class UrlService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAll(): Promise<UrlDto[]> {
		try {
			const urls = await this.prismaService.url.findMany()
			return plainToInstance(UrlDto, urls)
		} catch (error) {
			throw new BadRequestException(
				'Something went wrong on getting all urls',
				error
			)
		}
	}

	public async redirectToURLByShortURL(shortUrl: string): Promise<String> {
		const url = await this.findURLByShortURL(shortUrl)
		return url.originalUrl
	}

	public async getInfoByShortURL(shortUrl: string): Promise<UrlDto> {
		return await this.findURLByShortURL(shortUrl)
	}

	public async create(dto: UrlCreateDto): Promise<String> {
		await this.isUniqueURL(dto.originalUrl)

		const url = await this.prismaService.url.create({
			data: {
				originalUrl: dto.originalUrl,
				shortUrl: randomBytes(6).toString('hex'),
				expiresAt: dto.expiresAt
			}
		})
		return url.shortUrl
	}

	public async delete(shortUrl: string): Promise<void> {
		const url = await this.findURLByShortURL(shortUrl)
		await this.prismaService.url.delete({
			where: {
				shortUrl: url.shortUrl
			}
		})
	}

	public async toggle(shortUrl: string): Promise<void> {
		const url = await this.findURLByShortURL(shortUrl)
		await this.prismaService.url.update({
			where: {
				shortUrl
			},
			data: {
				isActive: !url.isActive
			}
		})
	}

	async isUniqueURL(url: string): Promise<void> {
		const urlExists = await this.prismaService.url.findUnique({
			where: {
				originalUrl: url
			}
		})

		if (urlExists) {
			throw new ConflictException('URL already exists')
		}
	}

	async findURLByShortURL(shortUrl: string): Promise<UrlDto> {
		const url = await this.prismaService.url.findUnique({
			where: {
				shortUrl
			}
		})

		if (!url) {
			throw new NotFoundException('URL not found!')
		}

		return plainToInstance(UrlDto, url)
	}
}
