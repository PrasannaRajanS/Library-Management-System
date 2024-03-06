export interface IEmployee {
    employeeId?: string | null | undefined;

    // Personal Info
    employeeNo?: number | null | undefined;
    salutationId?:number | null | undefined;
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    nickName?: string | null | undefined;
    genderId?: number | null | undefined;
    dob?: number | null | undefined;
    age?: number | null | undefined;

     // Present Address
    address1?:string | null | undefined;
    address2?:string|null|undefined;
    address3?:string|null|undefined;
    city?:string|null|undefined;
    stateId?:number|null|undefined;
    countryId?:number|null|undefined;
    pinCode?:number|null|undefined;

    // selectedPresentCountry?: object | null | undefined;

    // Permanent Address
    
    sameasPresent:boolean|null|undefined;
    permanantAddress1?: string | null | undefined;
    permanantAddress2?: string | null | undefined;
    permanantAddress3?: string | null | undefined;
    permanantCity?: string | null | undefined;
    permanantStateId?: string | null | undefined;
    permanantCountryId?: string | null | undefined;
    permanantPINCode?: number | null | undefined;

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
    contactPersonMobileNo1?: string | null | undefined;
    contactPerson2?: string | null | undefined;
    contactPersonMobileNo2?: string | null | undefined;
    bloodGroupId?: number | null | undefined;

    // Unique Number Info
    nationalityId?: number | null | undefined;
    panNo?: string | null | undefined;
    uanNo?: string | null | undefined;
    aadhaarNo?: number | null | undefined;
    esiNo?: string | null | undefined;
    epfNo?: string | null | undefined;
    communityId?: number | null | undefined;


    passportNo?: string | null | undefined;
    passportExpDt?: string | null | undefined;
    drivingLicenseNo?: string | null | undefined;
    drivingLicenseExpDt?: string | null | undefined;
    jobDescription?: string | null | undefined;
    aboutMe?: string | null | undefined;

    identyMarks1?: string | null | undefined;
    identyMarks2?: string | null | undefined;

    // officialEmail?: string | null | undefined;
    // officialMobile?: string | null | undefined;

    dateofJoin?: string | null | undefined;
    empCategoryId?: string | null | undefined;
    departmentId?: string | null | undefined;
    sectionId?: string | null | undefined;
    employeementTypeId?: string | null | undefined;
    reportingToId?: string | null | undefined;
    salaryTypeId?: string | null | undefined;
    locationId?: string | null | undefined;
    shiftId?: string | null | undefined;
    designationId?: string | null | undefined;

    // Education Detail

    // Family Information
    selectedGender?:string|null|undefined,


    isActive?: boolean | null | undefined;
    // what is this?
    companyId?: number | null | undefined;
    unitId?: number | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}

// #region EDUCATION DETAIL
export interface IEducationDetail {
    educationDtlId?: string | null | undefined;  //	uniqueidentifier
    employeeId: string | null | undefined;
    qualificationId?: number | null | undefined;
    courseId?: number | null | undefined;
    specialisationId?: number | null | undefined;
    schoolCollege?: string | null | undefined;
    percentage?: number | null | undefined;
    yearOfPassing: string | null | undefined;
    modeOfStudyId?: number | null | undefined;
    isActive?: boolean | null | undefined;
    
    // selectedQualification?: any | null | undefined;
    // selectedCourse?: any | null | undefined;
    // selectedSpecialisation?: any | null | undefined;
    // selectedModeOfStudy?: any | null | undefined;
    // CourseDurationStart?: Date | null | undefined;
    // CourseDurationEnd?: Date | null | undefined;
   
}

export interface IQualification {
    qualificationId?: number | null | undefined;
    qualificationName?: string | null | undefined;
}

export interface ICourse {
    courseId?: number | null | undefined;
    courseName?: string | null | undefined;
}

export interface ISpecialization {
    specializationId?: number | null | undefined;
    specializationName?: string | null | undefined;
}

export interface ICourseType {
    courseTypeId?: number | null | undefined;
    courseTypeName?: string | null | undefined;
}
//#endregion

export interface IWorkExperienceDetail {
    workExperienceDtlId?: string | null | undefined;  //	uniqueidentifier
    employeeId: string | null | undefined;
    companyName?: string | null | undefined;
    fromDate?: string | null | undefined;
    toDate?:string | null | undefined;
    experience?: string | null | undefined;
    jobTitleId?: string | null | undefined;
    jobDesc?: string | null | undefined;
    reasonForChange?: string | null | undefined;
    isActive?: boolean | null | undefined;

//     employmentType?: string | null | undefined;
//     selectedQualification?: any | null | undefined;
//     courseId?: number | null | undefined;
//    selectedCourse?: any | null | undefined;  
//     specialisationId?: number | null | undefined;
//     selectedSpecialisation?: any | null | undefined;
//     schoolCollege?: string | null | undefined;
//     modeOfStudyId?: number | null | undefined;
//     selectedModeOfStudy?: any | null | undefined;
//     percentage?: number | null | undefined;
//     CourseDurationStart?: Date | null | undefined;
//     CourseDurationEnd?: Date | null | undefined;
    
  
}