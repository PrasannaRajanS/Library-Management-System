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
  })

});