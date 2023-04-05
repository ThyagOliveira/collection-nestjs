import { Test, TestingModule } from '@nestjs/testing';
import { ComponentsController } from './components.controller';
import { ComponentsService } from './components.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Component } from '@prisma/client';

describe('ComponentsController', () => {
  let controller: ComponentsController;
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

  const mockPrismaService = {
    component: {
      create: jest.fn((data) => Promise.resolve(mockComponent)),
      findMany: jest.fn(() => Promise.resolve([mockComponent])),
      findUnique: jest.fn(() => Promise.resolve(mockComponent)),
      update: jest.fn((params) => Promise.resolve(mockComponent)),
      delete: jest.fn(() => Promise.resolve(mockComponent)),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentsController],
      providers: [
        ComponentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    controller = module.get<ComponentsController>(ComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
