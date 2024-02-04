import * as yup from 'yup';
export const YupPMSValidation = Object.freeze({
    EMPLOYEE: yup.object().shape({
        employeeId: yup.number().nullable().notRequired(),

        // Personal Info

        employeeNumber: yup.number().notRequired(),
        firstName: yup.string().required('Name is required'),
        lastName: yup.string().notRequired(),
        nickName: yup.string().notRequired(),
        gender: yup.string().notRequired(),
        DOB: yup.number().nullable().notRequired(),
        age: yup.number().nullable().notRequired(),

        // Present Address

        presentAddress1: yup.string().notRequired(),
        presentAddress2: yup.string().notRequired(),
        presentAddress3: yup.string().notRequired(),
        presentCity: yup.string().notRequired(),
        presentState: yup.string().notRequired(),
        presentCountry: yup.string().notRequired(),
        presentPIN: yup.number().notRequired(),

        // Permanent Address

        permanentAddress1: yup.string().notRequired(),
        permanentAddress2: yup.string().notRequired(),
        permanentAddress3: yup.string().notRequired(),
        permanentCity: yup.string().notRequired(),
        permanentState: yup.string().notRequired(),
        permanentCountry: yup.string().notRequired(),
        permanentPIN: yup.number().notRequired(),

        //  Organizational Info
        officialEmail: yup.string().notRequired(),
        officialMobile: yup.string().notRequired(),
        dateOfJoin: yup.date().required('Date of join is required'),
        employeeCategory: yup.string().required('Category is required'),
        deptSection: yup.string().required('Department is required'),
        production: yup.string().notRequired(),
        typeOfEmployment: yup.string().required('Employment is required'),
        reportingTo: yup.string().notRequired(),
        salaryType: yup.string().required('Type is required'),
        workingLocation: yup.string().required('Location is required'),
        shift: yup.string().notRequired(),
        designationJobTitle: yup.string().required('Designation is required'),

        //  Emergency Contact Info

        contactPerson1: yup.string().required('Name is required'),
        mobileNo1: yup.string().required('Number is required'),
        contactPerson2: yup.string().notRequired(),
        mobileNo2: yup.string().notRequired(),
        bloodGroup: yup.string().notRequired(),

        // Unique Number Info

        nationality: yup.string().required('Nationality is required'),
        community: yup.string().required('Community is required'),
        PANNo: yup.string().required('PAN No is required'),
        aadhaarNo: yup.number().required('Aadhaar No is required '),
        UANNo: yup.number().notRequired(),
        ESINo: yup.number().notRequired(),
        EPFNo: yup.number().notRequired(),


        // Family Information

        selectedGender:yup.string().notRequired(),

        isActive: yup.boolean().notRequired(),
        unitId: yup.number().nullable().notRequired(),
        userId: yup.number().nullable().notRequired(),
        ipAddress: yup.string().notRequired(),
    }),
    

});
