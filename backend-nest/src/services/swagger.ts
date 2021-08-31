import { ApiProperty } from '@nestjs/swagger';

export class UpdateRating {
  @ApiProperty({ required: false })
  rating: number;
}

export class ApiUser {
  @ApiProperty({ required: false })
  id: number;
  @ApiProperty({ required: false })
  name: string;
  @ApiProperty({ required: false })
  photo: string;
  @ApiProperty({ required: false })
  large_photo: string;
  @ApiProperty({ required: false })
  login: string;
  @ApiProperty({ required: false })
  email: string;
  @ApiProperty({ required: false })
  phone: string;
  @ApiProperty({ required: false })
  rating: number;
}
