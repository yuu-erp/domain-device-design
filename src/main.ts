import { AppModule } from "./app.module";
(async function bootstrap() {
  const appModule = new AppModule();
  document.addEventListener("DOMContentLoaded", () => appModule.init());
})();
