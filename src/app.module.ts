import { UserModule } from "./modules/user/user.module";
import { Module } from "./packages";

@Module({
  imports: [UserModule],
})
export class AppModule {}
