import {
	Body,
	Controller,
	Delete,
	Get,
	Ip,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { UrlCreateDto } from './dto/url.request'
import { UrlAnalyticsDto, UrlDto, UrlInfoDto } from './dto/url.response'
import { UrlService } from './url.service'

@Controller('url')
@ApiTags('Url')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UrlController {
	constructor(private readonly urlService: UrlService) {}

	@ApiOperation({ summary: 'Get all URLS' })
	@Get()
	public async getShortURLS(): Promise<UrlDto[]> {
		return this.urlService.getAll()
	}

	@ApiOperation({ summary: 'Redirect to URL with shortURL' })
	@Get(':shortUrl')
	public async redirectToURLByShortURL(
		@Param('shortUrl') shortUrl: string,
		@Ip() ip: string
	): Promise<String> {
		return this.urlService.redirectToURLByShortURL(shortUrl, ip)
	}

	@ApiOperation({ summary: 'Get info about URL with shortURL' })
	@Get('/info/:shortUrl')
	public async getInfo(
		@Param('shortUrl') shortUrl: string
	): Promise<UrlInfoDto> {
		return this.urlService.getInfoByShortURL(shortUrl)
	}

	@ApiOperation({ summary: 'Get URL Analytics' })
	@Get('/analytics/:shortUrl')
	public async getAnalytics(
		@Param('shortUrl') shortUrl: string
	): Promise<UrlAnalyticsDto> {
		return this.urlService.getURLAnalytics(shortUrl)
	}

	@ApiOperation({ summary: 'Create a new short url' })
	@UsePipes(new ValidationPipe())
	@Post('/shorten')
	public async createShortURL(@Body() dto: UrlCreateDto): Promise<String> {
		return this.urlService.create(dto)
	}

	@ApiOperation({ summary: 'Delete URL by shortURL' })
	@Delete('/delete/:shortUrl')
	public async deleteShortURL(
		@Param('shortUrl') shortUrl: string
	): Promise<void> {
		return this.urlService.delete(shortUrl)
	}

	@ApiOperation({ summary: 'Toggle URL status with shortURL' })
	@Patch('/toggle-status/:shortUrl')
	public async toggleShortURL(
		@Param('shortUrl') shortUrl: string
	): Promise<void> {
		return this.urlService.toggle(shortUrl)
	}
}
