export interface IRole {
    applicationId?: number | null | undefined;
    application?: any | null | undefined;

    roleId?: number | null | undefined;
    roleName?: string | null | undefined;
    description?: string | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}
