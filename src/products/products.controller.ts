import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  SerializeOptions,
  Delete,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { ProductsService } from './products.service';
import { ProductRegisterDto } from './dto/product-register.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { Product } from './domain/product';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { QueryProductDto } from './dto/query-product.dto';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() productRegisterDto: ProductRegisterDto,
  ): Promise<Product> {
    return this.productsService.create(productRegisterDto);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryProductDto,
  ): Promise<InfinityPaginationResultType<Product>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.productsService.findManyWithFilter({
        filterOptions: query?.filters,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: Product['id']): Promise<void> {
    return this.productsService.delete(id);
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: Product['id'],
    @Body() updateProfileDto: ProductUpdateDto,
  ): Promise<Product | null> {
    return this.productsService.update(id, updateProfileDto);
  }
}
