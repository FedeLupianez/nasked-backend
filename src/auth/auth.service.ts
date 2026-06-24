import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { hash, verify } from 'argon2';
import { randomUUID } from "crypto";
import { RefreshTokens } from "src/entities/refresh-tokens.entity";
import { type User, UserCreateDTO } from "src/user/user.dto";
import { UserService } from "src/user/user.service";
import { IsNull, Repository } from "typeorm";
import { jwt_payload, RefreshTokenDTO } from "./auth.dto";

export interface TokensInterface {
    access_token: string;
    refresh_token: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(RefreshTokens) private readonly refreshTokensRepo: Repository<RefreshTokens>
    ) { }

    async validateUser(email: string, passwd: string): Promise<User> {
        const user = await this.userService.get_user({ email: email });
        if (!user)
            throw new UnauthorizedException('User not found');
        const passwordValid = await verify(user.password, passwd);
        if (!passwordValid)
            throw new UnauthorizedException('Invalid Password');
        return user;
    }

    async validateRefreshRoken(token: string): Promise<boolean> {
        const storedTokens = await this.refreshTokensRepo.find();
        let storedToken: RefreshTokens | null = null;
        for (const stored of storedTokens) {
            const match = await verify(stored.token_hash, token);
            if (match) {
                storedToken = stored;
                break;
            }
        }
        if (!storedToken)
            throw new UnauthorizedException('Token not found');
        if (storedToken.revoked_at)
            throw new UnauthorizedException('Refresh Token revoked');
        const expires_at: Date = new Date(storedToken.expires_at);
        if (expires_at.getTime() <= Date.now()) {
            throw new UnauthorizedException('Token expired');
        }
        return true;
    }

    async register(user: UserCreateDTO): Promise<TokensInterface> {
        const new_user = await this.userService.create(user);
        if (!new_user)
            throw new UnauthorizedException('Invalid Credentials');
        const payload = {
            sub: new_user.id_user,
            email: new_user.email,
            jti: randomUUID()
        }
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken()
        }
    }

    async login(user_login: UserLoginDTO): Promise<TokensInterface> {
        const new_user = await this.validateUser(user_login.email, user_login.password);
        if (!new_user)
            throw new UnauthorizedException('Invalid Credentials');
        const payload = {
            sub: new_user.id_user,
            email: new_user.email,
            jti: randomUUID()
        }
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken()
        }
    }

    async logout(refreshToken: string): Promise<void> {
        const storedTokens = await this.refreshTokensRepo.find();
        let storedToken: RefreshTokens | null = null;
        for (const stored of storedTokens) {
            const match = await verify(stored.token_hash, refreshToken);
            if (match) {
                storedToken = stored;
                break;
            }
        }
        if (!storedToken)
            throw new BadRequestException('Refresh Token does not exists');
        storedToken.revoked_at = new Date();
    }

    private async generateRefreshToken(): Promise<string> {
        const token = randomUUID() + randomUUID();
        const tokenHash = await hash(token);
        const expires_at = new Date();
        expires_at.setDate(expires_at.getDate() + 7);

        await this.refreshTokensRepo.save({
            token_hash: tokenHash,
            expires_at: expires_at.toString(),
        })
        return token;
    }

    async refresh(refreshDto: RefreshTokenDTO): Promise<TokensInterface> {
        const tokenHash = await hash(refreshDto.token);
        const stored = await this.refreshTokensRepo.findOne({ where: { token_hash: tokenHash, revoked_at: IsNull() } });

        if (!stored)
            throw new UnauthorizedException('Invalid refresh token');

        await this.refreshTokensRepo.update(stored.id_token, { revoked_at: Date.now().toString() });

        const payload: jwt_payload = {
            sub: refreshDto.id_user,
            email: (await this.userService.get_user({ id_user: refreshDto.id_user })).email,
            jti: randomUUID()
        };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: await this.generateRefreshToken()
        };
    }

    getEmail(token: string): string {
        const payload: jwt_payload = this.jwtService.verify(token);
        return payload.email;
    }
}
