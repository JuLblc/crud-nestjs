import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";

@Injectable()
export class ProductsService {
  constructor(private readonly http: HttpService) {}

  getProduct(producId: string) {
    return this.http
      .get("https://world.openfoodfacts.org/api/v0/product/" + producId + ".json")
      .pipe(map((response) => response.data.product));
  }
}
