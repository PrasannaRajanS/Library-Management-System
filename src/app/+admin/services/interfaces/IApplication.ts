export interface IApplication {
    applicationId?: number | null | undefined;
    applicationName?: string | null | undefined;
    description?: string | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}
