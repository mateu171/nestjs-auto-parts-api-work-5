import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoPartsController } from './auto-parts/auto-parts.controller';
import { AutoPartsService } from './auto-parts/auto-parts.service';

@Module({
  imports: [],
  controllers: [AppController, AutoPartsController],
  providers: [AppService, AutoPartsService],
})
export class AppModule {}