import { Controller, Get } from '@nestjs/common';
import { Public } from './routes/auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  @Get()
  @Public()
  getHome(): { status: string } {
    return { status: 'ok' };
  }
}
