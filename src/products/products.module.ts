import { Module ,CacheModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
