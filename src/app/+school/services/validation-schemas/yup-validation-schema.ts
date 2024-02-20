import * as yup from "yup";

export const YupSchoolValidation = Object.freeze({

    PERIOD : yup.object().shape({

        periodId: yup.number().nullable(),
        type: yup.object().required('Type is required'),
        name: yup.string().required('Name is required'),
        startTime: yup.number().nullable().required('Start Time is required'),
        endTime:  yup.number().nullable().required('End Time is required'),
        description: yup.string().nullable().notRequired(),

        isActive: yup.boolean().nullable(),
        userId: yup.number().nullable(),
        ipAddress: yup.string().nullable()

    })
    
});

