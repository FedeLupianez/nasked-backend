import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService, type TokensInterface, type UserLoginDTO } from './auth.service';
import { UserCreateDTO } from 'src/user/user.dto';
import { type RefreshTokenDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: UserCreateDTO, @Res({ passthrough: true }) res) {
        const new_tokens: TokensInterface = await this.authService.register(body);
        const days: number = 7;
        res.cookie('refresh_token_nasked', new_tokens.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: days * 60 * 60 * 24
        })

        return {
            access_token: new_tokens.access_token
        }
    }

    @Post('login')
    async login(@Body() body: UserLoginDTO, @Res({ passthrough: true }) res) {
        const new_tokens: TokensInterface = await this.authService.login(body);
        const days: number = 7;
        res.cookie('refresh_token_nasked', new_tokens.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: days * 60 * 60 * 24
        })

        return {
            access_token: new_tokens.access_token
        }
    }


    @Post('refresh')
    async refresh(@Body() body: RefreshTokenDTO, @Req() req, @Res({ passthrough: true }) res) {
        const token = req.cookies['refresh_token_nasked'];
        await this.authService.validateRefreshRoken(token);
        const new_tokens: TokensInterface = await this.authService.refresh(body);
        const days: number = 7;
        res.cookie('refresh_token_cecit', new_tokens.refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: days * 60 * 60 * 24
        });
        return {
            access_token: new_tokens.access_token
        }
    }

    @Post('logout')
    async logout(@Req() req) {
        const token = req.cookies['refresh_token_nasked'];
        await this.authService.validateRefreshRoken(token);
        await this.authService.logout(token);
    }

}
