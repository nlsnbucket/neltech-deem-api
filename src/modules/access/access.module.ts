import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessController } from './access.controller';
import { AccessRepository } from './access.repository';
import { UserModule } from '../user/user.module';
import { environment } from 'src/config/environment';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AccessController],
  providers: [AccessService, AccessRepository],
  exports: [AccessService],
})
export class AccessModule {}
