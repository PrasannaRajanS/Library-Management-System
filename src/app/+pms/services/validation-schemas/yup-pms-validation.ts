import * as yup from 'yup';
export const YupPMSValidation = Object.freeze({
    EMPLOYEE: yup.object().shape({
        employeeId: yup.string().nullable().notRequired(),

        // Personal Info

        employeeNo: yup.number().notRequired(),
        salutationId: yup.number().notRequired(), 
        firstName: yup.string().required('Name is required'),
        lastName: yup.string().notRequired(),
        nickName: yup.string().notRequired(),
        genderId: yup.string().notRequired(),
        dob: yup.number().nullable().notRequired(),
        age: yup.number().nullable().notRequired(),


        // Present Address

        address1: yup.string().notRequired(),
        address2: yup.string().notRequired(),
        address3: yup.string().notRequired(),
        city: yup.string().notRequired(),
        stateId: yup.object().nullable().notRequired(),
        presentCountryId: yup.number().nullable().notRequired(),
        countryId: yup.object().nullable().notRequired(),
        pinCode: yup.number().notRequired(),

        // Permanent Address
        sameasPresent:yup.boolean().notRequired(),
        permanantAddress1: yup.string().notRequired(),
        permanantAddress2: yup.string().notRequired(),
        permanantAddress3: yup.string().notRequired(),
        permanantCity: yup.string().notRequired(),
        permanantStateId: yup.string().notRequired(),
        permanantCountryId: yup.string().notRequired(),
        permanantPINCode: yup.number().notRequired(),

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
        contactPersonMobileNo1: yup.string().required('Number is required'),
        contactPerson2: yup.string().notRequired(),
        contactPersonMobileNo2: yup.string().notRequired(),
        bloodGroupId: yup.string().notRequired(),

        // Unique Number Info

        nationalityId: yup.string().required('Nationality is required'),
        panNo: yup.string().required('PAN No is required'),
        uanNo: yup.number().notRequired(),
        aadhaarNo: yup.number().required('Aadhaar No is required '),
        esiNo: yup.number().notRequired(),
        epfNo: yup.number().notRequired(),
        communityId: yup.string().required('Community is required'),


        // Family Information

        selectedGender:yup.string().notRequired(),

        isActive: yup.boolean().notRequired(),
        companyId:yup.number().nullable().notRequired(),
        unitId: yup.number().nullable().notRequired(),
        userId: yup.number().nullable().notRequired(),
        ipAddress: yup.string().notRequired(),
    }),
    

});
