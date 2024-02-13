import {UserAccountDTO} from "./user-account";

export interface SecretaryDTO {
  id: number ;
  firstName: string;
  lastName: string;
  cni: string;
  userAccountDTO: UserAccountDTO;
}
