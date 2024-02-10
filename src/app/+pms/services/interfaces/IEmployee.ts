export interface IEmployee {
    employeeId?: number | null | undefined;

    // Personal Info
    employeeNumber?: number | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    nickName?: string | null | undefined;
    gender?: string | null | undefined;
    DOB?: number | null | undefined;
    age?: number | null | undefined;

    // Present Address


    presentAddress1?: string | null | undefined;
    presentAddress2?: string | null | undefined;
    presentAddress3?: string | null | undefined;
    presentCity?: string | null | undefined;

    selectedPresentState?: any | null | undefined;

    presentCountryId?: number | null | undefined;
    selectedPresentCountry?: object | null | undefined;

    presentPIN?: number | null | undefined;

    // Permanent Address

    permanentAddress1?: string | null | undefined;
    permanentAddress2?: string | null | undefined;
    permanentAddress3?: string | null | undefined;
    permanentCity?: string | null | undefined;
    permanentState?: string | null | undefined;
    permanentCountry?: string | null | undefined;
    permanentPIN?: number | null | undefined;

    //  Organizational Info

    officialEmail?: string | null | undefined;
    officialMobile?: string | null | undefined;
    dateOfJoin?: Date | null | undefined;
    employeeCategory?: string | null | undefined;
    deptSection?: string | null | undefined;
    production?: string | null | undefined;
    typeOfEmployment?: string | null | undefined;
    reportingTo?: string | null | undefined;
    salaryType?: string | null | undefined;
    workingLocation?: string | null | undefined;
    shift?: string | null | undefined;
    designationJobTitle?: string | null | undefined;

    //  Emergency Contact Info

    contactPerson1?: string | null | undefined;
    mobileNo1?: string | null | undefined;
    contactPerson2?: string | null | undefined;
    mobileNo2?: string | null | undefined;
    bloodGroup?: string | null | undefined;

    // Unique Number Info
    nationality?: string | null | undefined;
    PANNo?: string | null | undefined;
    community?: string | null | undefined;
    aadhaarNo?: number | null | undefined;
    UANNo?: number | null | undefined;
    ESINo?: number | null | undefined;
    EPFNo?: number | null | undefined;

    


    // Education Detail

    // Family Information
    selectedGender?:string|null|undefined,


    isActive?: boolean | null | undefined;
    unitId?: number | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}
