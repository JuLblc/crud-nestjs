import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Welcome to Innovorder Software Technical Tests: Création d'un CRUD via NestJS!";
  }
}
