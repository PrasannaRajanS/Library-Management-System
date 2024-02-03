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

    addressOne: yup.string().nullable().notRequired(),
    addressTwo: yup.string().nullable().notRequired(),
    addressThree: yup.string().nullable().notRequired(),
    addressFour: yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    state: yup.string().nullable().notRequired(),
    country: yup.string().nullable().notRequired(),
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
    // organizationId: yup.number().nullable(),
    // organizationName: yup.string().required('Name is required'),
    institutionId: yup.number().nullable(),
    institutionName: yup.string().required('Name is required'),
    nameOfSchool: yup.string().required('Name Of School is required'),
    shortName: yup.string().required('Short Name is required'),
    schoolUDISECode: yup.string().required('School UDise Code is required'),
    affiliatedCode: yup.string().required('Affiliated Code is required'),
    category: yup.string().required('Category is required'),

    // Address Details
    addressOne: yup.string().nullable().notRequired(),
    addressTwo: yup.string().nullable().notRequired(),
    addressThree: yup.string().nullable().notRequired(),
    addressFour: yup.string().nullable().notRequired(),
    cityId: yup.string().nullable().notRequired(),
    stateId: yup.string().nullable().notRequired(),
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
    basicStateId: yup.string().nullable().notRequired(),
    basicDistrictId: yup.string().nullable().notRequired(),
    basicCityId: yup.string().nullable().notRequired(),
    basicLocation: yup.string().nullable().notRequired(),
    basicPincode: yup.number().nullable().notRequired(),
    basicMunicipality: yup.string().nullable().notRequired(),
    basicBlock: yup.string().nullable().notRequired(),
    basicWard: yup.string().nullable().notRequired(),
    basicPanchayat: yup.string().nullable().notRequired(),
    basicMohalla: yup.string().nullable().notRequired(),
    basicCluster: yup.string().nullable().notRequired(),
    basicSchoolType: yup.string().nullable().notRequired(),
    basicSchoolCategory: yup.string().nullable().notRequired(),
    basicSchoolManagement: yup.string().nullable().notRequired(),
    basicClassFrom: yup.number().nullable().notRequired(),
    basicClassTo: yup.number().nullable().notRequired(),
    basicMedium1: yup.string().nullable().notRequired(),
    basicMedium2: yup.string().nullable().notRequired(),
    basicMedium3: yup.string().nullable().notRequired(),
    basicMedium4: yup.string().nullable().notRequired(),
    basicPrePrimary: yup.boolean().nullable(),

    // Management Info
    YearOfEstablishment: yup.date().notRequired(),
    YearofRecognitionPri: yup.date().notRequired(),
    YearOfRecognitionUprPri: yup.date().notRequired(),
    YearOfRecognitionSec: yup.date().notRequired(),
    YearOfRecognitionHigherSec: yup.date().notRequired(),

    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
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

});

