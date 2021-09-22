import { Injectable, Inject, CACHE_MANAGER } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { Cache } from "cache-manager";

@Injectable()
export class ProductsService {
  constructor(
    private readonly http: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getProduct(producId: string) {

    const value = await this.cacheManager.get(producId);
    if (value) {
      console.log('from cache')
      return value;      
    }
    
    const res = this.http
      .get("https://world.openfoodfacts.org/api/v0/product/" + producId + ".json")
      .pipe(map((response) => response.data.product));

    await this.cacheManager.set(
      producId,
      res,
      { ttl: 300 } // 5 Minutes
    );
    console.log('from API')
    return res;
  }
}