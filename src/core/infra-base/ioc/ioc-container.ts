type Factory<T> = () => T;

export class IocContainer {
  private registry = new Map<string, Factory<any>>();
  private singletonInstances = new Map<string, any>();
  private currentlyResolving = new Set<string>();

  // Register a dependency as singleton or transient
  register<T>(
    token: string,
    factory: Factory<T>,
    isSingleton: boolean = false
  ): void {
    if (isSingleton) {
      this.registerSingleton(token, factory);
    } else {
      this.registerTransient(token, factory);
    }
  }

  // Register a dependency as singleton
  private registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.registry.set(token, () => {
      if (!this.singletonInstances.has(token)) {
        this.singletonInstances.set(token, factory());
      }
      return this.singletonInstances.get(token);
    });
  }

  // Register a dependency as transient (new instance every time)
  private registerTransient<T>(token: string, factory: Factory<T>): void {
    this.registry.set(token, factory);
  }

  // Resolve a dependency and return an instance
  resolve<T>(token: string): T {
    if (this.currentlyResolving.has(token)) {
      throw new Error(`Circular dependency detected for ${token}`);
    }

    this.currentlyResolving.add(token);
    const factory = this.registry.get(token);

    if (!factory) {
      throw new Error(`No provider found for ${token}`);
    }

    const instance = factory();
    this.currentlyResolving.delete(token);

    return instance;
  }

  // Check if a service is registered in the container
  has(token: string): boolean {
    return this.registry.has(token);
  }
}
