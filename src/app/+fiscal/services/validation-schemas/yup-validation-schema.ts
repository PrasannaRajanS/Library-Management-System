import * as yup from "yup";

export const YupFiscalValidation = Object.freeze({

  ACADEMIC_YEAR: yup.object().shape({
    academicYearId: yup.number().nullable(),
    academicYear: yup.array().required('Academic Year is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    accountYear: yup.date().required('Account Year is required'),
    isDefault: yup.object().nullable(),

    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),

  ORGANIZATION: yup.object().shape({
    organizationId: yup.number().nullable(),
    name: yup.string().required('Name is required'),
    shortName: yup.string().required('Short Name is required'),

    address1: yup.string().nullable().notRequired(),
    address2: yup.string().nullable().notRequired(),
    address3: yup.string().nullable().notRequired(),
    address4: yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    
     stateId: yup.number().nullable().notRequired(),
    // stateName: yup.string().nullable().notRequired(),
    selectedState: yup.object().nullable().notRequired(),

     countryId: yup.number().nullable().notRequired(),
    // countryName: yup.string().nullable().notRequired(),
    selectedCountry: yup.object().nullable().notRequired(),

    pinCode: yup.string().nullable().notRequired(),
    phoneNumber: yup.string().nullable().notRequired(),
    fax: yup.string().nullable().notRequired(),
    mobileNumber: yup.string().nullable().notRequired(),
    email: yup.string().email().nullable().notRequired(),
    website: yup.string().nullable().notRequired(),
    logoURL: yup.string().url().notRequired(),
    iconURL: yup.string().url().notRequired(),

    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),

  INSTITUTION: yup.object().shape({
    institutionId: yup.number().nullable().notRequired(),
    institutionName: yup.string().required('Name of the School is required'),
    organizationId: yup.number().nullable().notRequired(),
    selectedOrganization: yup.object().required('Organization Name is required'),
    shortName: yup.string().required('Short Name is required'),
    UDISECode: yup.string().required('UDISE Code is required'),

    stateId: yup.number().nullable().notRequired(),
    selectedState: yup.object().nullable().notRequired(),
    district: yup.string().nullable().notRequired(),
    block: yup.string().nullable().notRequired(),
    cluster: yup.string().nullable().notRequired(),
    ward: yup.string().nullable().notRequired(),
    mohalla: yup.string().nullable().notRequired(),
    pincode: yup.number().nullable().notRequired(),
    panchayat: yup.string().nullable().notRequired(),
    municipality: yup.string().nullable().notRequired(),

    categoryId: yup.number().nullable().notRequired(),
    selectedCategory: yup.object().nullable().notRequired(),

    stateManagement: yup.string().nullable().notRequired(),
    nationalManagement: yup.string().nullable().notRequired(),

    schoolTypeId: yup.number().nullable().notRequired(),
    selectedschoolType: yup.object().nullable().notRequired(),

    classFrom: yup.number().nullable().notRequired(),
    classTo: yup.number().nullable().notRequired(),
    selectedPrePrimary: yup.object().nullable().notRequired(),
    selectedMedium: yup.object().nullable().notRequired(),

    // Address Details
    address1: yup.string().nullable().notRequired(),
    address2: yup.string().nullable().notRequired(),
    address3: yup.string().nullable().notRequired(),
    address4: yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    addressStateId: yup.string().nullable().notRequired(),
    countryId: yup.string().nullable().notRequired(),
    pinCode: yup.string().nullable().notRequired(),
    phoneNumber1: yup.string().nullable().notRequired(),
    phoneNumber2: yup.string().nullable().notRequired(),
    fax: yup.string().nullable().notRequired(),
    mobileNumber1: yup.string().nullable().notRequired(),
    mobileNumber2: yup.string().nullable().notRequired(),
    primaryEmail: yup.string().email().nullable().notRequired(),
    secondaryEmail: yup.string().email().nullable().notRequired(),
    website: yup.string().nullable().notRequired(),


    // Basic Info
    // basicStateId: yup.string().nullable().notRequired(),
    // basicDistrictId: yup.string().nullable().notRequired(),
    // basicCityId: yup.string().nullable().notRequired(),
    // basicLocation: yup.string().nullable().notRequired(),
    // basicPincode: yup.number().nullable().notRequired(),
    // basicMunicipality: yup.string().nullable().notRequired(),
    // basicBlock: yup.string().nullable().notRequired(),
    
    // basicPanchayat: yup.string().nullable().notRequired(),
    // basicMohalla: yup.string().nullable().notRequired(),
    // 
    // basicSchoolType: yup.string().nullable().notRequired(),
    // basicSchoolCategory: yup.string().nullable().notRequired(),
    // basicSchoolManagement: yup.string().nullable().notRequired(),
    // basicClassFrom: yup.number().nullable().notRequired(),
    // basicClassTo: yup.number().nullable().notRequired(),
    // basicMedium1: yup.string().nullable().notRequired(),
    // basicMedium2: yup.string().nullable().notRequired(),
    // basicMedium3: yup.string().nullable().notRequired(),
    // basicMedium4: yup.string().nullable().notRequired(),
    // basicPrePrimary: yup.object().nullable(),



    

    

    // // Management Info
    // YearOfEstablishment: yup.date().notRequired(),
    // YearofRecognitionPri: yup.date().notRequired(),
    // YearOfRecognitionUprPri: yup.date().notRequired(),
    // YearOfRecognitionSec: yup.date().notRequired(),
    // YearOfRecognitionHigherSec: yup.date().notRequired(),

    // isActive: yup.boolean().nullable(),
    // userId: yup.number().nullable(),
    // ipAddress: yup.string().nullable()
  }),

  MISC: yup.object().shape({
    miscId: yup.number().nullable(),
    name: yup.string().nullable().required('Name is required'),
    description: yup.string().nullable().required('Description is required'),
    selectedMiscName: yup.object().nullable().notRequired(),
    isActive: yup.boolean().nullable(),
    unitId: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),
  // PMSMISC: yup.object().shape({
  //   PMSMiscId: yup.number().nullable(),
  //   PMSMiscName: yup.string().nullable().required('Name is required'),
  //   PMSMiscDescription: yup.string().nullable().required('Description is required'),
  //   selectedPMSMiscName: yup.object().nullable().notRequired(),
  //   isActive: yup.boolean().nullable(),
  //   unitId: yup.boolean().nullable(),
  //   userId: yup.number().nullable(),
  //   ipAddress: yup.string().nullable()
  // }),

});

