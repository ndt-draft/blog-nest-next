import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { permissions } from '../constants';

const { CREATE_USER, CREATE_POST } = permissions;

const PERMISSIONS = {
  admin: [CREATE_USER, CREATE_POST],
  author: [CREATE_POST],
  user: [],
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions =
      this.reflector.get<string[]>('permissions', context.getHandler()) ||
      this.reflector.get<string[]>(
        'permissions',
        context.getClass(), // Class-level metadata
      );

    if (!requiredPermissions) {
      return true; // No permissions required
    }

    const request = context.switchToHttp().getRequest();

    const userPermissions = PERMISSIONS[request.user.role] || []; // Assume user.permissions is populated by JwtAuthGuard or another mechanism
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
