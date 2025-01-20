// fetch-data-native.module.ts
import { FetchDataNativeController } from "./fetch-data-native.controller";

export class FetchDataNativeModule {
  private fetchDataNativeController: FetchDataNativeController;

  constructor() {
    // Khởi tạo controller trong module
    this.fetchDataNativeController = new FetchDataNativeController();
  }

  get controller(): FetchDataNativeController {
    // Trả về controller để sử dụng bên ngoài
    return this.fetchDataNativeController;
  }

  executeFetch(): void {
    // Ví dụ: sử dụng phương thức trong controller
    const result = this.fetchDataNativeController.fetchData();
    console.log(result);
  }
}
