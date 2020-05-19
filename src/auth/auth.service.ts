import { Injectable } from '@nestjs/common';

const users = [
  {
    name: 'Basketball',
    id: 1,
    password: 'Batman'
  },
  {
    name: 'Football',
    id: 2,
    password: 'Mugla'
  },
];

@Injectable()
export class AuthService {
  signIn() {
    return 'Sign In';
  }

  signUp() {
    return 'Sign Up';
  }
}
