import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { UrlCreateDto, UrlUpdateDto } from './dto/url.request'
import {
	UrlCreateResponseDto,
	UrlDto,
	UrlUpdateResponseDto
} from './dto/url.response'
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
		@Param('shortUrl') shortUrl: string
	): Promise<UrlDto> {
		return this.urlService.redirectToURLByShortURL(shortUrl)
	}

	@ApiOperation({ summary: 'Get info about URL with shortURL' })
	@Get('/info/:shortUrl')
	public async getInfo(@Param('shortUrl') shortUrl: string): Promise<UrlDto> {
		return this.urlService.getInfoByShortURL(shortUrl)
	}

	@ApiOperation({ summary: 'Create a new short url' })
	@UsePipes(new ValidationPipe())
	@Post('/shorten')
	public async createShortURL(
		@Body() dto: UrlCreateDto
	): Promise<UrlCreateResponseDto> {
		return this.urlService.create(dto)
	}

	@ApiOperation({ summary: 'Update an existing short url' })
	@UsePipes(new ValidationPipe())
	@Put('/shorten')
	public async updateShortURL(
		@Body() dto: UrlUpdateDto
	): Promise<UrlUpdateResponseDto> {
		return this.urlService.update(dto)
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
