import { SetMetadata } from '@nestjs/common';
import { permissions } from '../constants';

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

const { CREATE_USER, CREATE_POST, MANAGE_COMMENT } = permissions;
export const CanCreateUser = () => Permissions(CREATE_USER);
export const CanCreatePost = () => Permissions(CREATE_POST);
export const CanManageComment = () => Permissions(MANAGE_COMMENT);
