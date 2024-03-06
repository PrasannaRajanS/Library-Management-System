export interface IStudent {

    studentId?: number | null | undefined;
    rollNo?: number | null | undefined;
    admissionNo?: number | null | undefined;
    ewsNo?: number | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
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

    //  Emergency Contact Info
    contactPerson1?: string | null | undefined;
    mobileNo1?: string | null | undefined;
    contactPerson2?: string | null | undefined;
    mobileNo2?: string | null | undefined;
    bloodGroup?: string | null | undefined;

    // Unique Number Info
    nationality?: string | null | undefined;
    community?: string | null | undefined;
    panNo?: string | null | undefined;
    aadhaarNo?: number | null | undefined;
    uanNo?: number | null | undefined;
    esiNo?: number | null | undefined;
    epfNo?: number | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;

}