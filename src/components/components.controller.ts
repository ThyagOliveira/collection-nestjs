import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ComponentEntity } from './entities/component.entity';

@ApiTags('Componentes')
@Controller('api/components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @ApiCreatedResponse({ type: ComponentEntity })
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  @ApiOkResponse({ type: ComponentEntity, isArray: true })
  findAll() {
    return this.componentsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ComponentEntity })
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ComponentEntity })
  update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    return this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ComponentEntity })
  remove(@Param('id') id: string) {
    return this.componentsService.remove(id);
  }
}
