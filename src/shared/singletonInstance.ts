/* eslint-disable @typescript-eslint/no-explicit-any */
export class SingletonInstance {
  private static instances: Map<string, any> = new Map();

  static getInstance<T>(
    classType: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    const className = classType.name;

    if (!this.instances.has(className)) {
      const instance = new classType(...args);
      this.instances.set(className, instance);
    }

    return this.instances.get(className) as T;
  }
}
