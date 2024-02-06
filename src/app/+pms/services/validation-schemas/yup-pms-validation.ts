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
        presentState: yup.object().nullable().notRequired(),
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

        //  Organizational Info
        officialEmail: yup.string().notRequired(),
        officialMobile: yup.string().notRequired(),
        dateOfJoin: yup.number().notRequired(),
        employeeCategory: yup.string().notRequired(),
        deptSection: yup.string().notRequired(),
        production: yup.string().notRequired(),
        typeOfEmployment: yup.string().notRequired(),
        reportingTo: yup.string().notRequired(),
        salaryType: yup.string().notRequired(),
        workingLocation: yup.string().notRequired(),
        shift: yup.string().notRequired(),
        designationJobTitle: yup.string().notRequired(),

        //  Emergency Contact Info

        contactPerson1: yup.string().required('Name is required'),
        mobileNo1: yup.string().required('Number is required'),
        contactPerson2: yup.string().notRequired(),
        mobileNo2: yup.string().notRequired(),
        bloodGroup: yup.string().notRequired(),

        // Unique Number Info

        nationality: yup.string().notRequired(),
        PANNo: yup.number().notRequired(),
        community: yup.string().notRequired(),
        aadhaarNo: yup.number().notRequired(),
        UANNo: yup.number().notRequired(),
        ESINo: yup.number().notRequired(),
        EPFNo: yup.number().notRequired(),

        isActive: yup.boolean().notRequired(),
        unitId: yup.number().nullable().notRequired(),
        userId: yup.number().nullable().notRequired(),
        ipAddress: yup.string().notRequired(),
    }),
});
