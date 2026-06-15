import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private readonly userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            throw new UnauthorizedException('Not authenticated');
        }
        const user = await this.userService.get_admin(request.user.user_id);
        if (!user)
            throw new UnauthorizedException('Admin access required');
        return true;
    }
}
