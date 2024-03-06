import * as yup from 'yup';
export const YupPMSValidation = Object.freeze({
    EMPLOYEE: yup.object().shape({

        employeeId: yup.string().nullable().notRequired(),
        // Personal Info
        employeeNo: yup.string().nullable().notRequired(),
        salutationId: yup.number().nullable().notRequired(),
        selectedSalutation: yup.object().nullable().notRequired(),
        firstName: yup.string().nullable().required('First Name is required'),
        lastName: yup.string().nullable().notRequired(),
        nickName: yup.string().nullable().notRequired(),
        genderId: yup.number().nullable().notRequired(),
        selectedGender: yup.object().nullable().notRequired(),
        dob: yup.date().nullable().notRequired(),
        age: yup.number().nullable().notRequired(),

        // Present Address
        address1: yup.string().nullable().notRequired(),
        address2: yup.string().nullable().notRequired(),
        address3: yup.string().nullable().notRequired(),
        city: yup.string().nullable().notRequired(),
        stateId: yup.number().nullable().notRequired(),
        selectedState: yup.object().nullable().notRequired(),
        countryId: yup.number().nullable().notRequired(),
        selectedCountry: yup.object().nullable().notRequired(),
        pinCode: yup.number().nullable().notRequired(),

        // Permanent Address
        sameasPresent: yup.boolean().nullable().notRequired(),
        permanantAddress1: yup.string().nullable().notRequired(),
        permanantAddress2: yup.string().nullable().notRequired(),
        permanantAddress3: yup.string().nullable().notRequired(),
        permanantCity: yup.string().nullable().notRequired(),
        permanantStateId: yup.number().nullable().notRequired(),
        permanantSelectedState: yup.object().nullable().nullable().notRequired(),
        permanantCountryId: yup.number().nullable().notRequired(),
        permanantSelectedCountry: yup.object().nullable().notRequired(),
        permanantPINCode: yup.number().nullable().notRequired(),

        //  Emergency Contact Info
        contactPerson1: yup.string().nullable().notRequired(),
        contactPersonMobileNo1: yup.string().nullable().notRequired(),
        contactPerson2: yup.string().nullable().notRequired(),
        contactPersonMobileNo2: yup.string().nullable().notRequired(),
        bloodGroupId: yup.number().nullable().notRequired(),
        selectedBloodGroup: yup.object().nullable().notRequired(),


        // // Unique Number Info
        panNo: yup.string().nullable().notRequired(),
        uanNo: yup.string().nullable().notRequired(),
        aadhaarNo: yup.string().nullable().notRequired(),
        esiNo: yup.string().nullable().notRequired(),
        epfNo: yup.string().nullable().notRequired(),
        nationalityId: yup.number().nullable().notRequired(),
        selectedNationality: yup.object().nullable().notRequired(),
        communityId: yup.number().nullable().notRequired(),
        selectedCommunity: yup.object().nullable().notRequired(),

        // //  Organizational Info
        officialEmail: yup.string().nullable().notRequired(),
        officialMobile: yup.string().nullable().notRequired(),
        dateofJoin: yup.date().nullable().notRequired(),
        empCategoryId: yup.number().nullable().notRequired(),
        selectedEmployeeCategory: yup.object().nullable().notRequired(),
        departmentId: yup.number().nullable().notRequired(),
        selectedDepartment: yup.object().nullable().notRequired(),
        sectionId: yup.number().nullable().notRequired(),
        selectedSection: yup.object().nullable().notRequired(),

        employeementTypeId: yup.number().nullable().notRequired(),
        selectedEmployeementType: yup.object().nullable().notRequired(),
        reportingToId: yup.number().nullable().notRequired(),
        selectedReportingTo: yup.object().nullable().notRequired(),
        salaryTypeId: yup.number().nullable().notRequired(),
        selectedSalaryType: yup.object().nullable().notRequired(),
        locationId: yup.number().nullable().notRequired(),
        selectedLocation: yup.object().nullable().notRequired(),
        shiftId: yup.number().nullable().notRequired(),
        selectedShift: yup.object().nullable().notRequired(),
        designationId: yup.number().nullable().notRequired(),
        selectedDesignation: yup.object().nullable().notRequired(),

        isActive: yup.boolean().nullable().notRequired(),
        companyId:yup.number().nullable().notRequired(),
        unitId: yup.number().nullable().notRequired(),
        userId: yup.number().nullable().notRequired(),
        ipAddress: yup.string().nullable().notRequired(),
    }),
    

});
