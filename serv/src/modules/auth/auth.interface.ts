import { ApiProperty } from '@nestjs/swagger';

export class IAuth {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp6b21iaTFAcmFtYmxlci51YSIsImlkIjoxLCJuYW1lIjoiYXJ0ZW0iLCJpYXQiOjE2OTQ1NTU2NzYsImV4cCI6MTY5NDY0MjA3Nn0.64Hd2k6kUigZUQaa0AofM8JnLPt5VuK8YSl3vrMvo_Q',
    description: 'token',
  })
  token: string;
}
