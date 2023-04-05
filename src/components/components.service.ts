import { Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Component } from '@prisma/client';

@Injectable()
export class ComponentsService {
  constructor(private prisma: PrismaService) {}

  async create(createComponentDto: CreateComponentDto): Promise<Component> {
    return this.prisma.component.create({ data: createComponentDto });
  }

  async findAll(): Promise<Component[]> {
    return this.prisma.component.findMany();
  }

  async findByCategory(category: string): Promise<Component[]> {
    return this.prisma.component.findMany({
      where: {
        category: {
          contains: category,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOne(id: string): Promise<Component | null> {
    return this.prisma.component.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    return this.prisma.component.update({
      where: { id },
      data: updateComponentDto,
    });
  }

  async remove(id: string): Promise<Component> {
    return this.prisma.component.delete({ where: { id } });
  }
}
