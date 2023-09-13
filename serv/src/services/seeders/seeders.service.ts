import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import axios from 'axios';

import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class SeedersService {
  constructor(private authService: AuthService) {}

  async generate(): Promise<string> {
    try {
      const promises = [];

      for (let i = 0; i < 2; i++) {
        const user = {
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          avatar: faker.internet.avatar(),
        };
        const bufferImg = await axios.get(user.avatar, {
          responseType: 'arraybuffer',
        });
        delete user.avatar;
        const avatar = bufferImg.data;
        promises.push(this.authService.registration(user, avatar));
      }
      //run several requests to create users and download avatars at the same time,
      await Promise.all(promises);
      return 'success';
    } catch (e) {
      throw e;
    }
  }
}
