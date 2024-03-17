import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '../domain/file';
import { IsString } from 'class-validator';

export class FileDto implements FileType {
  @ApiProperty({ example: 'upload-a-file-and-paste-the-id-here' })
  @IsString()
  id: string;

  path: string;
}
