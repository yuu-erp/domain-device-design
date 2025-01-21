import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}
  hello() {
    console.log("userService", this.userService);
    return this.userService.helloA();
  }
}
