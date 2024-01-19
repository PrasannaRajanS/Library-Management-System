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
    addressOne: yup.string().required('Address-1 is required'),
    addressTwo: yup.string().required('Address-2 is required'),
    addressThree: yup.string().required('Address-3 is required'),
    addressFour: yup.string().required('Address-4 is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    pinCode: yup.number().required('PIN Code is required'),
    phoneNumber: yup.number().required('Phone Number is required'),
    fax: yup.string().required('Fax is required'),
    mobileNumber: yup.number().required('Mobile Number is required'),
    email: yup. string().email().required('E-Mail is required'),
    website: yup.string().url().nullable(), 


    isActive:yup.boolean().nullable(),
    userId:yup.number().nullable(),
    ipAddress:yup.string().nullable()
  })

});