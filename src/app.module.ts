import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		CommonModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
