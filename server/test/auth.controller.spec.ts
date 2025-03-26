import { 
    Test, 
    TestingModule
} from '@nestjs/testing';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUserService = {
    findOne: jest.fn((username: string) =>
      username === 'validUser'
        ? Promise.resolve({
            id: 1,
            username: 'validUser',
            password: 'validPassword',
          })
        : null,
    ),
    validatePassword: jest.fn((password: string) =>
      password === 'validPass' ? Promise.resolve(true) : Promise.resolve(false),
    ),
  };

  const mockJwtService = {
    sign: jest.fn((payload: any) => {
      expect(payload).toEqual({ username: 'validUser', sub: 1 });
      return 'mock-token-for-validUser';
    }),
  };

  const mockAuthService = {
    login: jest.fn(async (username: string, password: string) => {
      const user = await mockUserService.findOne(username);
      if (!user) {
        return null;
      }
      return mockUserService.validatePassword(password).then((isValid) => {
        if (!isValid) {
          return null;
        }
        const payload = { username: user.username, sub: user.id };
        const token = mockJwtService.sign(payload);
        return { access_token: token };
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT token when login is successful', async () => {
    const res = await controller.login({
      username: 'validUser',
      password: 'validPass',
    });
    expect(res).toEqual({ access_token: 'mock-token-for-validUser' });
    expect(mockAuthService.login).toHaveBeenCalled();
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      username: 'validUser',
      sub: 1,
    });
  });

  it('should return null for invalid login', async () => {
    const res = await controller.login({
      username: 'invalidUser',
      password: 'invalidPass',
    });
    expect(res).toBeNull();
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
