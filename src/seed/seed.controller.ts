import { Controller, Get, Query, UnauthorizedException } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly configService: ConfigService,
  ) { }

  @Get('food')
  executeSeedFood(@Query('key') key: string) {

    const seedSecret = this.configService.get("SEED_SECRET") || "mi_clave_Secreta_123";

    if (key !== seedSecret) {
      throw new UnauthorizedException("clave de seed inválida");
    }

    return this.seedService.runSeedFood();
  }
}
