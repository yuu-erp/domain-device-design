import { LoggerService } from "./core/application/service/logger.service";
import { DappEntity } from "./core/domain/entities/dapp.entity";
import { DappCreatedDomainEvent } from "./core/domain/events/dapp-create.event";
import { Emitter } from "./core/infra-base/emitter/emitter";

export class AppModule {
  constructor() {
    console.time("Time run application");
    console.log("AppModule dependencies initialized...");
    this.configureDependencies();
    console.timeEnd("Time run application");
  }

  configureDependencies() {}

  public async init(): Promise<void> {
    try {
      // Tạo instance của logger và emitter
      const logger = new LoggerService(); // Giả sử bạn đã cài đặt LoggerPort
      const emitter = new Emitter(); // Giả sử bạn đã cài đặt Emitter
      emitter.on(
        "DappCreatedDomainEvent",
        async (event: DappCreatedDomainEvent) => {
          // Xử lý sự kiện khi Dapp được tạo
          console.log("DappCreatedDomainEvent received:", event);
          console.log(`Dapp Created: ${event.name}, URL: ${event.url}`);
        }
      );
      // Các thuộc tính tạo Dapp
      const dappProps = {
        id: 1,
        name: "My DApp",
        logo: "url_to_logo.png",
        url: "https://mydapp.com",
        type: 1, // Giả sử DappType là một enum hoặc string
      };

      // Tạo DappEntity mới
      const dapp = DappEntity.create(dappProps, logger, emitter);

      // Sau khi tạo, bạn có thể kiểm tra các sự kiện của thực thể DappEntity
      console.log(dapp.domainEvents); // In ra các sự kiện đã được thêm vào

      console.log("Application initialized successfully.", dapp);
    } catch (error) {
      console.log(error);
    }
  }
}
