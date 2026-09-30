import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { AutoPartsService } from './auto-parts.service';
import { CreateAutoPartDto } from './dto/create-auto-part.dto';
import { UpdateAutoPartDto } from './dto/update-auto-part.dto';

@Controller('auto-parts')
export class AutoPartsController {
  constructor(
    private readonly autoPartService: AutoPartsService,
  ) {}

  @Get()
  @Header('X-API-Version', '1.0')
  @Header('X-Service-Status', 'operational')
  findAll(
    @Query('search') search?: string,
    @Query('limit') limit?: string,
  ) {
    return this.autoPartService.findAll(search, limit);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.autoPartService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAutoPartDto: CreateAutoPartDto) {
    return this.autoPartService.create(createAutoPartDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAutoPartDto: UpdateAutoPartDto,
  ) {
    return this.autoPartService.update(id, updateAutoPartDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.autoPartService.remove(id);
  }
}