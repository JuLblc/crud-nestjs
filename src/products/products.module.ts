import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';

@Module({
  imports: [HttpModule],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
