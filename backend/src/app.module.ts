import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person';
import {LatencySimulatorMiddleware} from "./util";

const rootPath = join(__dirname, '..', '..', '..', 'frontend', 'dist');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath,
      exclude: ['/backend/*'],
    }),
    PersonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
      consumer.apply(LatencySimulatorMiddleware).forRoutes('*');
  }
}
