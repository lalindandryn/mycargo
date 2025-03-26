import { Test, TestingModule } from '@nestjs/testing';
import {
  RequestWithUser,
  UsersController,
} from '../src/controller/user.controller';
import { UserService } from '../src/service/user.service';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../src/helper/jwt-auth.guard';
import { Request } from 'express';

describe('UserController', () => {
  let userController: UsersController;

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, username: 'John Doe', password: 'jdoe' },
      { id: 2, username: 'Jane Doe', password: 'jane' },
    ]),
    findOne: jest.fn((username: string) =>
      Promise.resolve({ id: 1, username }),
    ),
    create: jest.fn((username: string) => Promise.resolve({ id: 3, username })),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest<Request>();
      req.user = { id: 1, username: 'John Doe', password: 'jdoe' };
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return all users', async () => {
    expect(await userController.findAll()).toEqual([
      { id: 1, username: 'John Doe', password: 'jdoe' },
      { id: 2, username: 'Jane Doe', password: 'jane' },
    ]);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should return a user by username', async () => {
    expect(await userController.getUser('John Doe')).toEqual({
      id: 1,
      username: 'John Doe',
    });
    expect(mockUserService.findOne).toHaveBeenCalledWith('John Doe');
  });

  it('should return the user profile when JWT is valid', () => {
    const req = {
      user: { id: 1, username: 'John Doe', password: 'jdoe' },
    } as RequestWithUser;
    const res = userController.getProfile(req);
    expect(res).toEqual({ id: 1, username: 'John Doe', password: 'jdoe' });
  });

  it('should create a new user', async () => {
    expect(
      await userController.createUser({
        username: 'Nimoy',
        password: 'paichi',
      }),
    ).toEqual({ id: 3, username: 'Nimoy' });
    expect(mockUserService.create).toHaveBeenCalledWith('Nimoy', 'paichi');
  });

  it('should delete a user', async () => {
    await userController.deleteUser(1);
    expect(mockUserService.remove).toHaveBeenCalledWith(1);
  });
});
