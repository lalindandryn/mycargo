import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from 'src/dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async changePassword(id: number, data: ChangePasswordDto) {
    const user = await this.findOneById(id);
    const isValid = await bcrypt.compare(data.oldPassword, user.password);
    if (!isValid) {
      throw new Error('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    user.password = hashedPassword;
    user.updatedAt = new Date();

    return this.userRepository.save(user);
  }

  async sendResetPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.jwtService.sign(
      { email: user.email },
      { secret: process.env.JWT_SECRET_KEY, expiresIn: '1h' },
    );
    console.log(`Send reset lint to ${email}: ${token}`);
    return { message: `Reset password link sent to ${email}` };
  }

  async resetPassword(token: string, newPassword: string) {
    const decode = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
    const user = await this.userRepository.findOne({
      where: { email: decode.email },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return { message: 'Password reset successfully' };
  }

  async confirmEmail(token: string){
    const decode = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
    const user = await this.userRepository.findOne({where: {email: decode.email}})
    if(!user){
      throw new Error('User not found')
    }

    user.isConfirmed = true
    await this.userRepository.save(user)
    return { message: 'Email confirmed'}
  }

  async updateUserInfo(id: number, updateData: UpdateUserDto) {
    const user = await this.findOneById(id);
    Object.assign(user, updateData);
    user.updatedAt = new Date();
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
