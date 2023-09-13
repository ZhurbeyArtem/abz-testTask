import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';
import axios from 'axios';

@Injectable()
export class FileService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '../../../', 'static');

      //create folder if it`s exist
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      // change sizes
      const croppedImageBuffer = await sharp(file.buffer)
        .resize({ width: 70, height: 70, fit: 'cover' })
        .toBuffer();
        
      // compresin img
      const optimizationResult = await axios.post(
        'https://api.tinypng.com/shrink',
        croppedImageBuffer,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${process.env.TINY_API}`,
            ).toString('base64')}`,
            'Content-Type': 'image/png',
          },
        },
      );

      // get img`s url
      const optimizedImage = optimizationResult.data.output.url;

      // get buffer`s img
      const bufferImg = await axios.get(optimizedImage, {
        responseType: 'arraybuffer',
      });

      // add img to static
      fs.writeFileSync(path.join(filePath, fileName), bufferImg.data);

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error when we try download file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
