import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Component } from '@prisma/client';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) {}

  create(createComponentDto: CreateComponentDto): Promise<Component> {
    return this.prisma.component.create({ data: createComponentDto });
  }

  findAll() {
    return this.prisma.component.findMany();
  }

  findOne(id: string) {
    return this.prisma.component.findUnique({ where: { id } });
  }

  update(id: string, updateComponentDto: UpdateComponentDto) {
    return this.prisma.component.update({
      where: { id },
      data: updateComponentDto,
    });
  }

  remove(id: string) {
    return this.prisma.component.delete({ where: { id } });
  }
}
