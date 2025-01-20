import { StoragePort } from "src/core/infra-base/storage/storage.port";

export class CalculateLayoutController {
  constructor(private readonly storage: StoragePort<{ name: string }>) {}

  init() {
    this.storage.set("name", "Lê Khải Hoàn");
    console.log("CalculateLayoutService", this.storage.getAll());
  }
}
