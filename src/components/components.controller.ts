import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ComponentEntity } from './entities/component.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserTypes } from 'src/auth/user-type.decorator';
import { UserType } from '@prisma/client';
import { PermissionsGuard } from 'src/auth/permissions.guard';

@ApiTags('Componentes')
@Controller('api/components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  @UserTypes(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ComponentEntity })
  async create(@Body() createComponentDto: CreateComponentDto) {
    return await this.componentsService.create(createComponentDto);
  }

  @Get()
  @UserTypes(UserType.ADMIN, UserType.PRO, UserType.NORMAL)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComponentEntity, isArray: true })
  async findAll() {
    return await this.componentsService.findAll();
  }

  @Get('category/:category')
  @UserTypes(UserType.ADMIN, UserType.PRO)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComponentEntity })
  async findByCategory(@Param('category') category: string) {
    return await this.componentsService.findByCategory(category);
  }

  @Get(':id')
  @UserTypes(UserType.ADMIN, UserType.PRO)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComponentEntity })
  async findOne(@Param('id') id: string) {
    const component = await this.componentsService.findOne(id);

    if (!component) {
      throw new NotFoundException(`Component ${id} does not exist`);
    }

    return component;
  }

  @Patch(':id')
  @UserTypes(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComponentEntity })
  async update(
    @Param('id') id: string,
    @Body() updateComponentDto: UpdateComponentDto,
  ) {
    const component = await this.componentsService.findOne(id);

    if (!component) {
      throw new NotFoundException(`Component ${id} does not exist`);
    }

    return await this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  @UserTypes(UserType.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ComponentEntity })
  async remove(@Param('id') id: string) {
    const component = await this.componentsService.findOne(id);

    if (!component) {
      throw new NotFoundException(`Component ${id} does not exist`);
    }

    return await this.componentsService.remove(id);
  }
}
