import { ApiProperty } from '@nestjs/swagger';
import { Component } from '@prisma/client';

export class ComponentEntity implements Component {
  constructor(partial: Partial<ComponentEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

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

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
