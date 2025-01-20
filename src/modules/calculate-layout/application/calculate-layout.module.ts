import { StoragePort } from "src/core/infra-base/storage/storage.port";
import { CalculateLayoutController } from "./calculate-layout.controller";

export class CalculateLayoutModule {
  private calculateLayoutController: CalculateLayoutController;
  constructor(private readonly storage: StoragePort) {
    this.calculateLayoutController = new CalculateLayoutController(
      this.storage
    );
  }
  init() {
    this.calculateLayoutController.init();
  }
  get controller() {
    return this.calculateLayoutController;
  }
}
