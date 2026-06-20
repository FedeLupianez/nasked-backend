import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokens } from 'src/entities/refresh-tokens.entity';
import { FoldersEntity } from 'src/entities/folders/folders.entity';
import { UserModule } from 'src/user/user.module';
import { AdminsModule } from 'src/entities/admins/admins.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stategy';
import { AdminGuard } from './admin.guard';
import { FolderAdminGuard } from './folder-admin.guard';

@Module({
    imports: [PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET ?? 'secret',
        signOptions: { expiresIn: (process.env.JWT_ACCESS_EXPIRATION || '15m') as `${number}${'s' | 'm' | 'h' | 'd'}` }
    }),
        TypeOrmModule.forFeature([RefreshTokens, FoldersEntity]),
        UserModule,
        AdminsModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, AdminGuard, FolderAdminGuard],
    exports: [AuthService, AdminGuard, FolderAdminGuard]
})
export class AuthModule { }
