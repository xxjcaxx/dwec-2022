import { Survivor } from './survivor';
export interface User {

    email: string;
    password: string;

}

export interface Player {
  id: string;
  nick: string;
  user: User;
  avatar: string;
  survivors: Survivor[];
}
