import { Test } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
    type: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCreateUserDto: CreateUserDto = {
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
  };

  const mockUpdateUserDto: UpdateUserDto = {
    name: 'Updated User',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue(mockUser),
              findMany: jest.fn().mockResolvedValue([mockUser]),
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue(mockUser),
              delete: jest.fn().mockResolvedValue(mockUser),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Create a new user', async () => {
      const user = await service.create(mockCreateUserDto);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: mockCreateUserDto,
      });
    });
  });

  describe('findAll', () => {
    it('Return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual([mockUser]);
      expect(users).toBeInstanceOf(Array);
      expect(prismaService.user.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('Return a user by id', async () => {
      const user = await service.findOne('1');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findOneByEmail', () => {
    it('Return a user by email', async () => {
      const user = await service.findOneByEmail('test@example.com');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });
  });

  describe('update', () => {
    it('Update a user by id', async () => {
      const user = await service.update('1', mockUpdateUserDto);
      expect(user).toEqual(mockUser);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: mockUpdateUserDto,
      });
    });
  });

  describe('remove', () => {
    it('Remove a user by id', async () => {
      const user = await service.remove('1');
      expect(user).toEqual(mockUser);
      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
