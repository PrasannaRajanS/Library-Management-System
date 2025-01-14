export interface IOrganization {
    organizationId?: number | null | undefined;
    name?: string | null | undefined;
    shortName?: string | null | undefined;
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    address3?: string | null | undefined;
    address4?: string | null | undefined;
    city?: string | null | undefined;
    
    stateId?: number | null | undefined;
    selectedState?: any | null | undefined;

    countryId?: number | null | undefined;
    selectedCountry?: any | null | undefined;

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
