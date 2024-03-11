export interface IEmployee {

    employeeId?: string | null | undefined;
    // Personal Info
    employeeNo?: string | null | undefined;
    salutationId?: number | null | undefined;
    selectedSalutation?: any | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    nickName?: string | null | undefined;
    genderId?: number | null | undefined;
    selectedGender?:any | null | undefined;
    dob?: Date | null | undefined;
    age?: number | null | undefined;

     // Present Address
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    address3?: string | null | undefined;
    city?: string | null | undefined;
    stateId?: number | null | undefined;
    selectedState?:any | null | undefined;
    countryId?: number | null | undefined;
    selectedCountry?:any | null | undefined;
    pinCode?: number | null | undefined;

    // Permanent Address
    sameasPresent: boolean | null | undefined;
    permanantAddress1?: string | null | undefined;
    permanantAddress2?: string | null | undefined;
    permanantAddress3?: string | null | undefined;
    permanantCity?: string | null | undefined;
    permanantStateId?: number | null | undefined;
    permanantSelectedState?: any | null | undefined;
    permanantCountryId?: number | null | undefined;
    permanantSelectedCountry?: any | null | undefined;
    permanantPINCode?: number | null | undefined;

    contactPerson1?: string | null | undefined;
    contactPersonMobileNo1?: string | null | undefined;
    contactPerson2?: string | null | undefined;
    contactPersonMobileNo2?: string | null | undefined;
    bloodGroupId?: number | null | undefined;
    selectedBloodGroup?:any | null | undefined;

    // Unique Number Info
    panNo?: string | null | undefined;
    uanNo?: string | null | undefined;
    passportNo?: string | null | undefined; //  
    passportExpDt?: string | null | undefined;  //
    drivingLicenseNo?: string | null | undefined; //  
    drivingLicenseExpDt?: string | null | undefined;  //
    aadhaarNo?: string | null | undefined;
    esiNo?: string | null | undefined;
    epfNo?: string | null | undefined;
    nationalityId?: number | null | undefined;
    selectedNationality?: any | null | undefined;
    communityId?: number | null | undefined;
    selectedCommunity?: any | null | undefined;
    jobDescription?: string | null | undefined;  // 
    aboutMe?: string | null | undefined; // 
    identyMarks1?: string | null | undefined; // 
    identyMarks2?: string | null | undefined; // 

    //  Organizational Info
    officialEmail?: string | null | undefined;
    officialMobile?: string | null | undefined;
    dateofJoin?: Date | null | undefined;
    empCategoryId?: number | null | undefined;
    selectedEmployeeCategory?: any | null | undefined;
    departmentId?: number | null | undefined;
    selectedDepartment?: any | null | undefined;
    sectionId?: number | null | undefined;
    selectedSection?: any | null | undefined;
    
    employeementTypeId?: number | null | undefined;
    selectedEmployeementType?: any | null | undefined;
    reportingToId?: number | null | undefined;
    selectedReportingTo?: any | null | undefined;
    salaryTypeId?: number | null | undefined;
    selectedSalaryType?: any | null | undefined;
    locationId?: number | null | undefined;
    selectedLocation?: any | null | undefined;
    shiftId?: number | null | undefined;
    selectedShift?: any | null | undefined;
    designationId?: number | null | undefined;
    selectedDesignation?: any | null | undefined;
    
    // education
    educationDtlId?: string | null | undefined;
    qualificationId?: number | null | undefined;
    // qualificationName?:string | null | undefined;
    selectedQualification?: any | null | undefined;
    courseId?: number | null | undefined;
    selectedCourse?: any | null | undefined;
    specialisationId?: number | null | undefined;
    selectedSpecialisation?: any | null | undefined;
    schoolCollege?: string | null | undefined;
    yearOfPassing?: number | null | undefined;
    percentage?: string | null | undefined;
    modeOfStudyId?: number | null | undefined;
    selectedModeOfStudy?: any | null | undefined;


// work experience
    
    workExperienceDtlId?: string | null | undefined;  //	uniqueidentifier
    companyName?: string | null | undefined;
    fromDate?: Date | null | undefined;
    toDate?:Date | null | undefined;
    experience?: number | null | undefined;
    jobTitleId?: number | null | undefined;
    selectedJobTitle?: any | null | undefined;
    
    jobDesc?: string | null | undefined;
    reasonForChange?: string | null | undefined;


    isActive?: boolean | null | undefined;
    companyId?: number | null | undefined;
    unitId?: number | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}

// #region EDUCATION DETAIL
export interface IEducationDetail {
    educationDtlId?: string | null | undefined; //	uniqueidentifier
    employeeId?: string | null | undefined;

    qualificationId?: number | null | undefined;
    qualificationName?: string | null | undefined;
    selectedQualification?: any | null | undefined;

    courseId?: number | null | undefined;
    courseName?:string | null | undefined;
    selectedCourse?: any | null | undefined;

    specialisationId?: number | null | undefined;
    specialisationName?:string | null | undefined;
    selectedSpecialisation?: any | null | undefined;

    schoolCollege?: string | null | undefined;
    yearOfPassing?: number | null | undefined;
    percentage?: string | null | undefined;

    modeOfStudyId?: number | null | undefined;
    modeOfStudy?: string | null | undefined;
    selectedModeOfStudy?: any | null | undefined;

    isActive?: boolean | null | undefined;
}

//#endregion

export interface IWorkExperienceDetail {
    workExperienceDtlId?: string | null | undefined;  //	uniqueidentifier
    employeeId: string | null | undefined;
    companyName?: string | null | undefined;
    fromDate?: string | null | undefined;
    toDate?:string | null | undefined;
    experience?: number | null | undefined;
    jobTitleId?: number | null | undefined;
    jobTitleName?:string | null | undefined;
    selectedJobTitle?: any | null | undefined;
    empCategoryId?: number | null | undefined;
    jobDesc?: string | null | undefined;
    reasonForChange?: string | null | undefined;
    employeeCategoryName?:string | null | undefined;
    isActive?: boolean | null | undefined;
}

// For DDL

export interface ISalutation {
    salutationId?: number | null | undefined;
    salutationName?: string | null | undefined;
}

export interface IBloodGroup {
    bloodGroupId?: number | null | undefined;
    bloodGroupName?: string | null | undefined;
}

export interface IGender {
    genderId?: number | null | undefined;
    genderName?: string | null | undefined;
}


export interface IEmployeeCategory{
    empCategoryId?: number | null | undefined;
    employeeCategoryName?: string | null | undefined;
}

export interface IDepartment{
    departmentId?: number | null | undefined;
    departmentName?: string | null | undefined;
}

export interface IEmploymentTypes{
    employeementTypeId?: number | null | undefined;
    employmentTypesName?: string | null | undefined;
}

export interface ISalaryType{
    salaryTypeId?: number | null | undefined;
    SalaryTypeName?: string | null | undefined;
}


export interface IShifts{
    shiftId?: number | null | undefined;
    shiftTypeName?: string | null | undefined;
}

export interface IDesignations{
    designationId?: number | null | undefined;
    designationName?: string | null | undefined;
}

export interface ICommunity{
    communityId?: number | null | undefined;
    communityName?: string | null | undefined;
}

export interface IQualification{
    qualificationId?: number | null | undefined;
    qualificationName?: string | null | undefined;
}

export interface ICourse {
    courseId?: number | null | undefined;
    courseName?: string | null | undefined;
}

export interface ISpecialization {
    specialisationId?: number | null | undefined;
    specialisationName?: string | null | undefined;
}


export interface ICourseType {
    modeOfStudyId?: number | null | undefined;
    courseTypeName?: string | null | undefined;
}

export interface IJobTitle {
    jobTitleId?: number | null | undefined;
    jobTitleName?:string | null | undefined;
}

// export interface IPermanantState{
//     permanantStateId?: number | null | undefined;
//     stateId?: number | null | undefined;
//     stateName?: string | null | undefined;
//     countryId?: number | null | undefined;
//     countryName?: string | null | undefined;
// }

// export interface IPermanantCoutry{
//     permanantCountryId?: number | null | undefined;
//     countryId?: number | null | undefined;
//     countryName?: string | null | undefined;
//     shortCode?: string | null | undefined;
//     phoneCode?: number | null | undefined;
//     isActive?: boolean | null | undefined;
//     code?: string | null | undefined;

// }
