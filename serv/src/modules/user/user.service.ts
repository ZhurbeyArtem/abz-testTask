import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { FileService } from 'src/services/file/file.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private fileService: FileService,
  ) { }

  async findByEmail(email): Promise<User> {
    try {
      return await this.userRepo.findOne({ where: { email } });
    } catch (e) {
      throw e;
    }
  }

  async createUser(data): Promise<User> {
    try {
      const fileName = await this.fileService.createFile(data.avatar);
      return await this.userRepo.save({ ...data, avatar: fileName });
    } catch (e) {
      throw e;
    }
  }

  async getAll({ page = 1, limit = 6 }) {
    try {
      const offset = page * limit - limit;
      const users = await this.userRepo
        .createQueryBuilder()
        .take(limit)
        .skip(offset)
        .getManyAndCount();

      return {
        users: users[0],
        count: users[1],
      };
    } catch (e) {
      throw e;
    }
  }
}
