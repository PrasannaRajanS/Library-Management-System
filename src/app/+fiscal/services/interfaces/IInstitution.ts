

export interface IInstitution {
    institutionId?: number | null | undefined;
    institutionName?: string | null | undefined;
    organizationId?: number | null | undefined;
    selectedOrganization?: object | null | undefined;
    shortName?: string | null | undefined;
    UDISECode?: string | null | undefined;

    // Basic Info
    stateId?: number | null | undefined;
    selectedState?: any | null | undefined;
    district?: string | null | undefined;
    block?: string | null | undefined;
    cluster?: string | null | undefined;
    ward?: string | null | undefined;
    mohalla?: string | null | undefined;
    pincode?: number | null | undefined;
    panchayat?: string | null | undefined;
    municipality?: string | null | undefined;

    categoryId?: number | null | undefined;
    selectedCategory?: object | null | undefined;

    stateManagement?: string | null | undefined;
    nationalManagement?: string | null | undefined;

    schoolTypeId?: number | null | undefined;
    selectedschoolType?: object | null | undefined;
    classFrom?: number | null | undefined;
    classTo?: number | null | undefined;

    selectedPrePrimary?: object | null | undefined;
    selectedMedium?: object | null | undefined;
    // basicLocation?: string | null | undefined;
    // basicPincode?: number | null | undefined;
    // basicMunicipality?: string | null | undefined;
    // basicBlock?: string | null | undefined;
    // 
    // basicPanchayat?: string | null | undefined;
    // basicMohalla?: string | null | undefined;
    
    // basicSchoolType?: string | null | undefined;
    // basicSchoolCategory?: string | null | undefined;
    // basicSchoolManagement?: string | null | undefined;
    // basicClassFrom?: number | null | undefined;
    // basicClassTo?: number | null | undefined;
    // basicMedium1?: string | null | undefined;
    // basicMedium2?: string | null | undefined;
    // basicMedium3?: string | null | undefined;
    // basicMedium4?: string | null | undefined;
    // basicPrePrimary?: any | null | undefined;





    // affiliatedCode?: string | null | undefined;
    // category?: string | null | undefined;

    // Address Details
    address1?: string | null | undefined;
    address2?: string | null | undefined;
    address3?: string | null | undefined;
    address4?: string | null | undefined;
    city?: string | null | undefined;
    addressStateId?: string | null | undefined;
    countryId?: string | null | undefined;
    selectedCountry?: object | null | undefined;

    
    pinCode?: string | null | undefined;
    fax?: string | null | undefined;
    mobileNumber1?: string | null | undefined;
    mobileNumber2?: string | null | undefined;
    phoneNumber1?: string | null | undefined;
    phoneNumber2?: string | null | undefined;
    primaryEmail?: string | null | undefined;
    secondaryEmail?: string | null | undefined;
    website?: string | null | undefined;

    

    // // Management Info

    // YearOfEstablishment?: Date | null | undefined;
    // YearofRecognitionPri?: Date | null | undefined;
    // YearOfRecognitionUprPri?: Date | null | undefined;
    // YearOfRecognitionSec?: Date | null | undefined;
    // YearOfRecognitionHigherSec?: Date | null | undefined;

    // isActive?: boolean | null | undefined;
    // userId?: number | null | undefined;
    // ipAddress?: string | null | undefined;


}



// addressOne
// addressTwo
// addressThree
// addressFour
// city
// stateId
// countryId
// pinCode
// fax
// mobileNumber1
// mobileNumber2
// phoneNumber1
// phoneNumber2
// primaryEmail
// secondaryEmail
// website


// organizationId
// organizationName
// nameOfSchool
// shortName
// schoolUDiseCode
// affiliatedCode
// category
