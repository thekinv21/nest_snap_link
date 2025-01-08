import { DocumentBuilder } from '@nestjs/swagger'

export const swagger = new DocumentBuilder()
	.setTitle('Snap Link API')
	.setDescription('Snap Link API Documentation')
	.setVersion('1.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			in: 'header',
			description: 'JWT Authorization for Access'
		},
		'access-token'
	)
	.build()
