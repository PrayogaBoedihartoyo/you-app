import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/controller/app.controller';
import { AppService } from '../src/services/app.service';
import { CreateUserDto } from '../src/dto/create-user.dto';
import { CreateProfileDto } from '../src/dto/create-profile.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        confirmPassword: 'password',
        displayName: 'Test User',
        gender: 'male',
        birthday: "1990-01-15T00:00:00.000Z",
        horoscope: 'Capricorn',
        zodiac: 'Horse',
        Height: "5'10",
        Weight: "150 lbs",
      };
      const user = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedPassword',
        profile: {
          displayName: 'Test User',
          gender: 'male',
          birthday: new Date('1990-01-01'),
          horoscope: 'Capricorn',
          zodiac: 'Horse',
          height: "5'10",
          weight: "150 lbs",
        },
      };
      jest.spyOn(appService, 'createUser').mockResolvedValue(user);

      const result = await appController.createUser(createUserDto);

      expect(result).toEqual(user);
    });
  });

  describe('login', () => {
    it('should log in a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        confirmPassword: 'password',
      };
      const user = {
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedPassword',
        profile: {
          displayName: 'Test User',
          gender: 'male',
          birthday: new Date('1990-01-01'),
          horoscope: 'Capricorn',
          zodiac: 'Horse',
          height: "5'10",
          weight: "150 lbs",
        },
      };
      jest.spyOn(appService, 'login').mockResolvedValue(user);

      const result = await appController.login(createUserDto);

      expect(result).toEqual(user);
    });
  });

  describe('findUserByUsername', () => {
    it('should find a user by username', async () => {
      const username = 'testuser';
      const user = {
        username: 'testuser@gmail.com',
      };
      jest.spyOn(appService, 'findUserByUsername').mockResolvedValue(user);

      const result = await appController.findUserByUsername(username);

      expect(result).toEqual(user);
    });

    it('should handle error when user not found', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(appService, 'findUserByUsername').mockRejectedValue(new Error('User not found'));

      const result = await appController.findUserByUsername(username);

      expect(result).toEqual({ message: 'User not found' });
    });
  });

  describe('createUserProfile', () => {
    it('should create a user profile', async () => {
      const username = 'testuser';
      const createProfileDto: CreateProfileDto = {
        displayName: 'Test User',
        gender: 'male',
        birthday: new Date(),
        horoscope: 'Capricorn',
        zodiac: 'Horse',
        height: 70,
        weight: 150,
        interests: ['hiking', 'biking', 'swimming'],
      };
      const user = {
        username: 'testuser@gmail.com',
        profile: createProfileDto,

      };
      jest.spyOn(appService, 'createUserProfile').mockResolvedValue(user);

      const result = await appController.createUserProfile(username, createProfileDto);

      expect(result).toEqual(user);
    });

    it('should handle error when user not found', async () => {
      const username = 'nonexistentuser';
      const createProfileDto: CreateProfileDto = {
        displayName: 'Test User',
        gender: "male",
        birthday: new Date(),
        horoscope: 'Capricorn',
        zodiac: 'Horse',
        height: 70,
        weight: 150,
        interests: ['hiking', 'biking', 'swimming'],
      };
      jest.spyOn(appService, 'createUserProfile').mockRejectedValue(new Error('User not found'));

      const result = await appController.createUserProfile(username, createProfileDto);

      expect(result).toEqual({ message: 'User not found' });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
