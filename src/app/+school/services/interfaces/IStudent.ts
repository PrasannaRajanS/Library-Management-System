export interface IStudent {

    studentId?: number | null | undefined;
    rollNo?: number | null | undefined;
    admissionNo?: number | null | undefined;
    ewsNo?: number | null | undefined;

    // Personal Info
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    gender?: string | null | undefined;
    DOB?: number | null | undefined;
    age?: number | null | undefined;
    genderId?: number | null | undefined;
    selectedGender?:any | null | undefined;
    bloodGroupId?: number | null | undefined;
    selectedBloodGroup?:any | null | undefined;

    // Present Address
    presentAddress1?: string | null | undefined;
    presentAddress2?: string | null | undefined;
    presentAddress3?: string | null | undefined;
    presentCity?: string | null | undefined;
    presentstateId?: number | null | undefined;
    selectedPresentState?: any | null | undefined;
    presentCountryId?: number | null | undefined;
    selectedPresentCountry?: any | null | undefined;
    presentPIN?: number | null | undefined;

    // Permanent Address
    permanentAddress1?: string | null | undefined;
    permanentAddress2?: string | null | undefined;
    permanentAddress3?: string | null | undefined;
    permanentCity?: string | null | undefined;
    permanentStateId?: number | null | undefined;
    selectedpermanentState?: any | null | undefined;
    permanentCountryId?: number | null | undefined;
    selectedpermanentCountry?: any | null | undefined;
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


    // Family 
    fatherName?: string | null | undefined;
    fatherEducationQualification?: string | null | undefined;
    fatherOccupation?: string | null | undefined;
    fatherDesignation?: string | null | undefined;
    fatherOrganizationInstitution?: string | null | undefined;
    fatherOfficeAddress?: string | null | undefined;
    fatherResidentialAddress?: string | null | undefined;
    fatherAnnualIncome?: number | null | undefined;
    fatherMobileNumber?: number | null | undefined;
    fatherEmail?: string | null | undefined;
    fatherAadharNumber?: number | null | undefined;

    motherName?: string | null | undefined;
    motherEducationQualification?: string | null | undefined;
    motherOccupation?: string | null | undefined;
    motherDesignation?: string | null | undefined;
    motherOrganizationInstitution?: string | null | undefined;
    motherOfficeAddress?: string | null | undefined;
    motherResidentialAddress?: string | null | undefined;
    motherAnnualIncome?: number | null | undefined;
    motherMobileNumber?: number | null | undefined;
    motherEmail?: string | null | undefined;
    motherAadharNumber?: number | null | undefined;

    guardianName?: string | null | undefined;
    guardianEducationQualification?: string | null | undefined;
    guardianOccupation?: string | null | undefined;
    guardianDesignation?: string | null | undefined;
    guardianOrganizationInstitution?: string | null | undefined;
    guardianOfficeAddress?: string | null | undefined;
    guardianResidentialAddress?: string | null | undefined;
    guardianAnnualIncome?: number | null | undefined;
    guardianMobileNumber?: number | null | undefined;
    guardianEmail?: string | null | undefined;
    guardianAadharNumber?: number | null | undefined;

    // Fees

    feesCategoryId?: number | null | undefined;
    selectedFeesCategory?: any | null | undefined;
    paymentMethodId?: number | null | undefined;
    selectedPaymentMethod?: any | null | undefined;
    feesStatusId?: number | null | undefined;
    selectedFeesStatus?: any | null | undefined;

    // Examination

    // Transport Details
    modeofTransportId?: number | null | undefined;
    selectedModeofTransport?: any | null | undefined;


    selectedRTE?: any | null | undefined;

    // Attendance
    totalPresent?: number | null | undefined;
    totalLate?: number | null | undefined;
    totalAbsent?: number | null | undefined;
    totalHalfDay?: number | null | undefined;
    totalHoliday?: number | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;

}


export interface IBloodGroup {
    bloodGroupId?: number | null | undefined;
    bloodGroupName?: string | null | undefined;
}

export interface IGender {
    genderId?: number | null | undefined;
    genderName?: string | null | undefined;
}
