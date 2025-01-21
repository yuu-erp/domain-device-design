import { Injectable } from "src/packages";

@Injectable()
export class UserService {
  constructor() {}

  helloA() {
    console.log("Hello word!");
  }
}
