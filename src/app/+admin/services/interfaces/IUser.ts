export interface IUser {
    userId?: number | null | undefined;
    userName?: string | null | undefined;

    employeeId?: number | null | undefined;
    employeeName? : string | null | undefined;
    employee? : any | null | undefined;

    password? : string | null | undefined;
    description? : string | null | undefined;

    pageId?: number | null | undefined;
    pageName?: string | null | undefined;
    page?: any | null | undefined;

    applicationId?: number | null | undefined;
    applicationName?: string | null | undefined;
    application?: any | null | undefined;

    roleId?: number | null | undefined;
    roleName?: string | null | undefined;
    role?: any | null | undefined;

    email?: string | null | undefined;
    phoneNumber?: string | null | undefined;

    isActive?: boolean | null | undefined;
    loggedinUserId?: number | null | undefined;
    ipAddress?: string | null | undefined;
    selectedUnits?: any | null | undefined;
}

export interface IUnit {
    unitId?: number | null | undefined;
    unitName?: string | null | undefined;
    companyId?: number | null | undefined;
    companyName?: string | null | undefined;
}

