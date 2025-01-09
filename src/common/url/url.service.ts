import { PrismaService } from '@/root/prisma'
import {
	BadRequestException,
	ConflictException,
	GoneException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { randomBytes } from 'crypto'
import { UrlCreateDto } from './dto/url.request'
import { UrlAnalyticsDto, UrlDto, UrlInfoDto } from './dto/url.response'

@Injectable()
export class UrlService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAll(): Promise<UrlDto[]> {
		try {
			const urls = await this.prismaService.url.findMany({
				where: {
					isActive: true
				}
			})
			return plainToInstance(UrlDto, urls)
		} catch (error) {
			throw new BadRequestException(
				'Something went wrong on getting all urls',
				error
			)
		}
	}

	public async redirectToURLByShortURL(
		shortUrl: string,
		ip: string
	): Promise<string> {
		const { originalUrl, expiresAt, id } =
			await this.prismaService.url.findUnique({
				where: {
					shortUrl
				},
				select: {
					originalUrl: true,
					expiresAt: true,
					id: true
				}
			})

		if (!originalUrl) {
			throw new NotFoundException('URL not found!')
		}

		if (expiresAt && new Date(this.formatDate(expiresAt)) <= new Date()) {
			throw new GoneException('URL expired!')
		}

		await this.prismaService.analytics.create({
			data: {
				urlId: id,
				ipAddress: ip
			}
		})

		await this.prismaService.url.update({
			where: { id },
			data: {
				clickCount: {
					increment: 1
				}
			}
		})
		return originalUrl
	}

	public async getInfoByShortURL(shortUrl: string): Promise<UrlInfoDto> {
		const url = await this.prismaService.url.findUnique({
			where: {
				shortUrl
			},
			select: {
				originalUrl: true,
				createdAt: true,
				clickCount: true,
				expiresAt: true
			}
		})
		if (!url) {
			throw new NotFoundException('URL not found!')
		}

		if (
			url.expiresAt &&
			new Date(this.formatDate(url.expiresAt)) <= new Date()
		) {
			throw new GoneException('URL expired!')
		}

		return url
	}

	public async getURLAnalytics(shortUrl: string): Promise<UrlAnalyticsDto> {
		const url = await this.prismaService.url.findUnique({
			where: {
				shortUrl
			},
			select: {
				expiresAt: true,
				shortUrl: true,
				clickCount: true,
				analytics: {
					select: {
						ipAddress: true,
						createdAt: true
					},
					take: 5,
					orderBy: {
						createdAt: 'desc'
					}
				}
			}
		})
		if (!url) {
			throw new NotFoundException('URL not found!')
		}

		if (
			url.expiresAt &&
			new Date(this.formatDate(url.expiresAt)) <= new Date()
		) {
			throw new GoneException('URL expired!')
		}

		return url
	}

	public async create(dto: UrlCreateDto): Promise<String> {
		await this.isUniqueURL(dto.originalUrl)

		if (dto.expiresAt && new Date(dto.expiresAt) <= new Date()) {
			throw new BadRequestException('Expiration date must be in the future')
		}

		const url = await this.prismaService.url.create({
			data: {
				originalUrl: dto.originalUrl,
				shortUrl: randomBytes(3).toString('hex'),
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

	async findIsActiveURLByShortURL(shortUrl: string): Promise<UrlDto> {
		const url = await this.prismaService.url.findUnique({
			where: {
				shortUrl,
				isActive: true
			}
		})

		if (!url) {
			throw new NotFoundException('URL not found!')
		}
		if (
			url.expiresAt &&
			new Date(this.formatDate(url.expiresAt)) <= new Date()
		) {
			throw new GoneException('URL expired!')
		}

		return plainToInstance(UrlDto, url)
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
		if (
			url.expiresAt &&
			new Date(this.formatDate(url.expiresAt)) <= new Date()
		) {
			throw new GoneException('URL expired!')
		}

		return plainToInstance(UrlDto, url)
	}

	private formatDate(expiresAt: Date): string {
		return new Date(expiresAt).toISOString().replace('T', ' ').split('.')[0]
	}
}
