export interface IOrganization {
    organizationId?: number | null | undefined;
    name?: string | null | undefined;
    shortName?: string | null | undefined;
    addressOne?: string | null | undefined;
    addressTwo?: string | null | undefined;
    addressThree?: string | null | undefined;
    addressFour?: string | null | undefined;
    city?: string | null | undefined;
    state?: string | null | undefined;
    country?: string | null | undefined;
    pinCode?: string | null | undefined; 
    phoneNumber?: string | null | undefined; 
    fax?: string | null | undefined;
    mobileNumber?: string | null | undefined; 
    email?:  string | null | undefined;
    website?: string | null | undefined;
    logoURL?: string | null | undefined; 
    iconURL?: string | null | undefined;
    
    
    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}