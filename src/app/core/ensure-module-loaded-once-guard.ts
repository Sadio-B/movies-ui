export class EnsureModuleLoadedOnceGuard {
    constructor(targetModule: any) {
        if (targetModule) {
            throw new Error(`${targetModule.constructor.name} has been already loaded.
            Please load this module only in the AppModule`)
        }
    }
}
