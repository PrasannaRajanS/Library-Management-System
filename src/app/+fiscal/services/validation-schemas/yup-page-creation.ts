import * as yup from "yup";

export const YupFiscalValidation = Object.freeze({

  ACADEMIC_YEAR: yup.object().shape({
    academicYearId: yup.number().nullable(),
    academicYear: yup.string().required('Academic Year is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    accountYear: yup.number().required('Account Year is required'),
    isDefault:yup.boolean().nullable(),

    isActive:yup.boolean().nullable(),
    userId:yup.number().nullable(),
    ipAddress:yup.string().nullable()
  })

});