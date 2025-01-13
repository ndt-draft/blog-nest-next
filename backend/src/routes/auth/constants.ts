export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const permissions = {
  CREATE_USER: 'CREATE_USER',
  CREATE_POST: 'CREATE_POST',
  MANAGE_COMMENT: 'MANAGE_COMMENT',
};

export enum Role {
  Admin = 'admin',
  Author = 'author',
  User = 'user',
}
