import { ModuleMetadata } from "../decorators";

class MetaNodeFactoryStatic {
  private readonly modules = new Map<any, any>();

  async registerModule(moduleClass: any): Promise<void> {
    console.log(`${moduleClass.name} dependencies initialized...`);

    const metadata: ModuleMetadata = Reflect.getMetadata(
      "module:metadata",
      moduleClass
    );
    if (!metadata) {
      throw new Error(`No metadata found for module: ${moduleClass.name}`);
    }

    if (!this.modules.has(moduleClass)) {
      const moduleInstance = new moduleClass();
      this.modules.set(moduleClass, moduleInstance);
    }

    // Khởi tạo các providers
    if (metadata.providers) {
      for (const provider of metadata.providers) {
        try {
          const providerInstance = this.getProviderInstance(provider);
          Reflect.defineMetadata(
            "provider:instance",
            providerInstance,
            provider
          );
        } catch (error) {
          // @ts-ignore
          console.error(`Failed to register provider ${provider.name}:`, error);
        }
      }
    }

    // Khởi tạo các controllers
    if (metadata.controllers) {
      for (const controller of metadata.controllers) {
        try {
          console.log("controller ádasdasd: ", controller);
          const controllerInstance = this.getControllerInstance(controller);
          Reflect.defineMetadata(
            "controller:instance",
            controllerInstance,
            controller
          );
        } catch (error) {
          console.error(
            `Failed to register controller ${controller.name}:`,
            error
          );
        }
      }
    }

    // Đệ quy khởi tạo các module con
    if (metadata.imports) {
      for (const importedModule of metadata.imports) {
        await this.registerModule(importedModule);
      }
    }
  }

  private getProviderInstance(provider: any): any {
    return new provider();
  }

  private getControllerInstance(controller: any): any {
    console.log("getControllerInstance - controller: ", controller);

    // Lấy metadata của constructor dependencies
    const metadataKeys = Reflect.getMetadataKeys(controller);
    console.log("getControllerInstance - Metadata Keys: ", metadataKeys);
    const metadata = Reflect.getMetadata("design:paramtypes", controller);
    console.log("metadata", metadata);
    const dependencies = metadata || [];
    const resolvedDeps = dependencies.map((dep: any) =>
      this.getProviderInstance(dep)
    );

    console.log("Creating controller with dependencies: ", resolvedDeps);
    return new controller(...resolvedDeps); // Tạo controller với dependencies đã được tiêm
  }

  getProvider<T>(providerClass: { new (...args: any[]): T }): T {
    console.log("getProvider - Metadata Keys: ", providerClass);

    const providerInstance = Reflect.getMetadata(
      "provider:instance",
      providerClass
    );
    console.log("getProvider - providerInstance: ", providerInstance);

    if (!providerInstance) {
      throw new Error(`Provider ${providerClass.name} not found`);
    }
    return providerInstance;
  }

  getController<T>(controllerClass: { new (...args: any[]): T }): T {
    const metadataKeys = Reflect.getMetadataKeys(controllerClass);
    console.log("getController - Metadata Keys: ", metadataKeys);
    const controllerInstance = Reflect.getMetadata(
      "controller:instance",
      controllerClass
    );
    console.log("getController - controllerInstance: ", controllerInstance);
    if (!controllerInstance) {
      throw new Error(`Controller ${controllerClass.name} not found`);
    }
    return controllerInstance;
  }
}

export const MetaNodeFactory = new MetaNodeFactoryStatic();
