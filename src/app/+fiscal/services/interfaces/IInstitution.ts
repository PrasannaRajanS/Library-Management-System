

export interface IInstitution {
    institutionId?: number | null | undefined;
    institutionName?: string | null | undefined;
    // organizationId?:number | null | undefined;
    // organizationName?:string | null | undefined;

    

    nameOfSchool?: string | null | undefined;
    shortName?: string | null | undefined;
    schoolUDISECode?: string | null | undefined;
    affiliatedCode?: string | null | undefined;
    category?: string | null | undefined;

    // Address Details
    addressOne?: string | null | undefined;
    addressTwo?: string | null | undefined;
    addressThree?: string | null | undefined;
    addressFour?: string | null | undefined;
    cityId?: string | null | undefined;
    stateId?: string | null | undefined;
    countryId?: string | null | undefined;
    pinCode?: string | null | undefined;
    fax?: string | null | undefined;
    mobileNumber1?: string | null | undefined;
    mobileNumber2?: string | null | undefined;
    phoneNumber1?: string | null | undefined;
    phoneNumber2?: string | null | undefined;
    primaryEmail?: string | null | undefined;
    secondaryEmail?: string | null | undefined;
    website?: string | null | undefined;

    // Basic Info

    basicStateId?: string | null | undefined;
    basicDistrictId?: string | null | undefined;
    basicCityId?: string | null | undefined;
    basicLocation?: string | null | undefined;
    basicPincode?: number | null | undefined;
    basicMunicipality?: string | null | undefined;
    basicBlock?: string | null | undefined;
    basicWard?: string | null | undefined;
    basicPanchayat?: string | null | undefined;
    basicMohalla?: string | null | undefined;
    basicCluster?: string | null | undefined;
    basicSchoolType?: string | null | undefined;
    basicSchoolCategory?: string | null | undefined;
    basicSchoolManagement?: string | null | undefined;
    basicClassFrom?: number | null | undefined;
    basicClassTo?: number | null | undefined;
    basicMedium1?: string | null | undefined;
    basicMedium2?: string | null | undefined;
    basicMedium3?: string | null | undefined;
    basicMedium4?: string | null | undefined;
    basicPrePrimary?: boolean | null | undefined;
    
    // Management Info

    YearOfEstablishment?: Date | null | undefined;
    YearofRecognitionPri?: Date | null | undefined;
    YearOfRecognitionUprPri?: Date | null | undefined;
    YearOfRecognitionSec?: Date | null | undefined;
    YearOfRecognitionHigherSec?: Date | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;


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
