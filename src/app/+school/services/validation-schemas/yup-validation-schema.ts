import * as yup from "yup";

export const YupSchoolValidation = Object.freeze({

    PERIOD: yup.object().shape({

        periodId: yup.number().nullable(),
        selectedtype: yup.object().required('Type is required'),
        name: yup.string().required('Name is required'),
        startTime: yup.date().nullable().required('Start Time is required'),
        endTime: yup.date().nullable().required('End Time is required'),
        description: yup.string().nullable().notRequired(),

        isActive: yup.boolean().nullable(),
        userId: yup.number().nullable(),
        ipAddress: yup.string().nullable()

    }),

    STUDENT: yup.object().shape({

        studentId: yup.number().nullable(),
        rollNo: yup.number().notRequired(),
        admissionNo: yup.number().notRequired(),
        ewsNo: yup.number().notRequired(),
        firstName: yup.string().notRequired(),
        lastName: yup.string().notRequired(),
        gender: yup.string().notRequired(),
        DOB: yup.number().nullable().notRequired(),
        age: yup.number().nullable().notRequired(),

        // Present Address
        presentAddress1: yup.string().notRequired(),
        presentAddress2: yup.string().notRequired(),
        presentAddress3: yup.string().notRequired(),
        presentCity: yup.string().notRequired(),
        selectedPresentState: yup.object().nullable().notRequired(),
        presentCountryId: yup.number().nullable().notRequired(),
        selectedPresentCountry: yup.object().nullable().notRequired(),
        presentPIN: yup.number().notRequired(),

        // Permanent Address
        permanentAddress1: yup.string().notRequired(),
        permanentAddress2: yup.string().notRequired(),
        permanentAddress3: yup.string().notRequired(),
        permanentCity: yup.string().notRequired(),
        permanentState: yup.string().notRequired(),
        permanentCountry: yup.string().notRequired(),
        permanentPIN: yup.number().notRequired(),

        //  Emergency Contact Info
        contactPerson1: yup.string().required('Name is required'),
        mobileNo1: yup.string().required('Number is required'),
        contactPerson2: yup.string().notRequired(),
        mobileNo2: yup.string().notRequired(),
        bloodGroup: yup.string().notRequired(),

        // Unique Number Info
        nationality: yup.string().required('Nationality is required'),
        community: yup.string().required('Community is required'),
        panNo: yup.string().required('PAN No is required'),
        aadhaarNo: yup.number().required('Aadhaar No is required '),
        uanNo: yup.number().notRequired(),
        esiNo: yup.number().notRequired(),
        epfNo: yup.number().notRequired(),


        isActive: yup.boolean().nullable(),
        userId: yup.number().nullable(),
        ipAddress: yup.string().nullable()

    })

});

