import { Test, TestingModule } from '@nestjs/testing';
import { ComponentsService } from './components.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Component } from '@prisma/client';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

describe('ComponentsService', () => {
  let service: ComponentsService;
  let prismaService: PrismaService;

  const mockComponent: Component = {
    id: '1',
    title: 'Test Component',
    category: 'Test Category',
    description: 'Test Description',
    urlThumbnail: 'Test url',
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateComponentDto: CreateComponentDto = {
    title: 'Test Component',
    category: 'Test Category',
    description: 'Test Description',
    urlThumbnail: 'Test url',
    price: 9.99,
  };

  const mockUpdateComponentDto: UpdateComponentDto = {
    title: 'Updated Component',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentsService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: {
            component: {
              create: jest.fn().mockResolvedValue(mockComponent),
              findMany: jest.fn().mockResolvedValue([mockComponent]),
              findUnique: jest.fn().mockResolvedValue(mockComponent),
              update: jest.fn().mockResolvedValue(mockComponent),
              delete: jest.fn().mockResolvedValue(mockComponent),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ComponentsService>(ComponentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Create a new component', async () => {
      const component = await service.create(mockCreateComponentDto);
      expect(component).toEqual(mockComponent);
      expect(prismaService.component.create).toHaveBeenCalledWith({
        data: mockCreateComponentDto,
      });
    });
  });

  describe('findAll', () => {
    it('Return an array of components', async () => {
      const components = await service.findAll();
      expect(components).toEqual([mockComponent]);
      expect(components).toBeInstanceOf(Array);
      expect(prismaService.component.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findByCategory', () => {
    it('Return an array of components of the given category', async () => {
      const component = await service.findByCategory(mockComponent.category);

      expect(component).toHaveLength(1);
      expect(component).toEqual([mockComponent]);
    });
  });

  describe('findOne', () => {
    it('Return a component by id', async () => {
      const component = await service.findOne('1');
      expect(component).toEqual(mockComponent);
      expect(prismaService.component.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('update', () => {
    it('Update a component by id', async () => {
      const component = await service.update('1', mockUpdateComponentDto);
      expect(component).toEqual(mockComponent);
      expect(prismaService.component.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateComponentDto,
      });
    });
  });

  describe('remove', () => {
    it('Remove a component by id', async () => {
      const component = await service.remove('1');
      expect(component).toEqual(mockComponent);
      expect(prismaService.component.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
