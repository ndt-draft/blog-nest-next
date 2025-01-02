import { SetMetadata } from '@nestjs/common';
import { permissions } from '../constants';

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

const { CREATE_USER, CREATE_POST } = permissions;
export const CanCreateUser = () => Permissions(CREATE_USER);
export const CanCreatePost = () => Permissions(CREATE_POST);
