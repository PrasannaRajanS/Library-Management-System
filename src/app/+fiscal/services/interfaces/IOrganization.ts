export interface IOrganization {
    organizationId?: number | null | undefined;
    name?: string | null | undefined;
    shortName?: string | null | undefined;
    
    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}