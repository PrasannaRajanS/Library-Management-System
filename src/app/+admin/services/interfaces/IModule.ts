export interface IModule {
    applicationId?: number | null | undefined;
    moduleId?: number | null | undefined;
    application?: any | null | undefined;
    moduleName?: string | null | undefined;
    description?: string | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}
