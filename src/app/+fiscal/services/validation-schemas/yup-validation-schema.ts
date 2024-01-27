import * as yup from "yup";

export const YupFiscalValidation = Object.freeze({

  ACADEMIC_YEAR: yup.object().shape({
    academicYearId: yup.number().nullable(),
    academicYear: yup.array().required('Academic Year is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    accountYear: yup.date().required('Account Year is required'),
    isDefault:yup.object().nullable(),

    isActive:yup.boolean().nullable(),
    userId:yup.number().nullable(),
    ipAddress:yup.string().nullable()
  }),

  ORGANIZATION: yup.object().shape({
    organizationId: yup.number().nullable(),
    name: yup.string().required('Name is required'),
    shortName: yup.string().required('Short Name is required'),

    addressOne: yup.string().nullable().notRequired(),
    addressTwo: yup.string().nullable().notRequired(),
    addressThree: yup.string().nullable().notRequired(),
    addressFour:yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    state: yup.string().nullable().notRequired(),
    country:yup.string().nullable().notRequired(),
    pinCode:yup.string().nullable().notRequired(),
    phoneNumber: yup.string().nullable().notRequired(),
    fax: yup.string().nullable().notRequired(),
    mobileNumber: yup.string().nullable().notRequired(),
    email: yup.string().email().nullable().notRequired(),
    website: yup.string().nullable().notRequired(),
    logoURL: yup.string().url().notRequired(),
    iconURL: yup.string().url().notRequired(),

    isActive:yup.boolean().nullable(),
    userId:yup.number().nullable(),
    ipAddress:yup.string().nullable()
  }),


  MISC: yup.object().shape({
    miscId: yup.number().nullable(),
    name: yup.string().nullable().required('Name is required'),
    description: yup.string().nullable().required('Description is required'),

    isActive:yup.boolean().nullable(),
    unitId:yup.boolean().nullable(),
    userId:yup.number().nullable(),
    ipAddress:yup.string().nullable()
  }),






});

