import { ApiProperty } from '@nestjs/swagger';

export class CreateComponentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  urlThumbnail: string;

  @ApiProperty()
  price: number;
}
