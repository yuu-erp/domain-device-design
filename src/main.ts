import { AppModule } from "./app.module";
import { UserController } from "./modules/user/user.controller";
import { UserService } from "./modules/user/user.service";
import { MetaNodeFactory } from "./packages";

async function bootstrap() {
  try {
    console.log("[INFO] Starting application...");
    await MetaNodeFactory.registerModule(AppModule);
    const userController = MetaNodeFactory.getController(UserController);
    const userService = MetaNodeFactory.getProvider(UserService);

    userController.hello();
    userService.helloA();
    console.log(`[INFO] Application is running on...`);
  } catch (error) {
    console.error("Application failed to start:", error);
  }
}

bootstrap();
