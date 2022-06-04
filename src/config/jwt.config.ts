import { JwtModuleAsyncOptions } from '@nestjs/jwt';

import appConfig from './appConfig';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: appConfig().appSecret,
      signOptions: { expiresIn: '1d' },
    };
  },
};
