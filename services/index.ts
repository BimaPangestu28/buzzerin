import { AuthService } from "./auth/AuthService";
import { UserService } from "./user/UserService";

export const services = {
    auth: new AuthService(),
    user: new UserService(),
  } as const;
  