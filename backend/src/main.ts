import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { default as swaggerUi } from 'swagger-ui-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';

const port = process.env.PORT || 3000;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Doutor ao Vivo')
    .setDescription(
      'API de Exemplo<br/>Vamos ver se o candidato documentou a API certinho?',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const basePath = 'backend';

  const helpPath = `/${basePath}/_/api-help`;
  const docsPath = `/${basePath}/_/api-docs`;

  app.use(docsPath, (_req, res: Response, _next) => res.json(document));

  app.use(
    helpPath,
    swaggerUi.serveWithOptions({ redirect: false }),
    swaggerUi.setup(undefined, {
      swaggerUrl: docsPath,
      customCss:
        'div[id^="operations-hidden"]{display:none} #operations-tag-hidden{display:none}',
    }),
  );

  app.enableCors();

  try {
    await app.listen(port);
  } catch (e) {}
};

bootstrap().then(_ => {
    console.debug(
        `
      App running at:
      - Local: http://localhost:${port}
  `,
    );
});
