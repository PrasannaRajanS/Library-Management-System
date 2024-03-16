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

        // Personal Info
        firstName: yup.string().notRequired(),
        lastName: yup.string().notRequired(),
        gender: yup.string().notRequired(),
        DOB: yup.number().nullable().notRequired(),
        age: yup.number().nullable().notRequired(),
        genderId: yup.number().nullable().notRequired(),
        selectedGender: yup.object().nullable().notRequired(),
        bloodGroupId: yup.number().nullable().notRequired(),
        selectedBloodGroup: yup.object().nullable().notRequired(),

        // Present Address
        presentAddress1: yup.string().notRequired(),
        presentAddress2: yup.string().notRequired(),
        presentAddress3: yup.string().notRequired(),
        presentCity: yup.string().notRequired(),
        presentstateId: yup.number().nullable().notRequired(),
        selectedPresentState: yup.object().nullable().notRequired(),
        presentCountryId: yup.number().nullable().notRequired(),
        selectedPresentCountry: yup.object().nullable().notRequired(),
        presentPIN: yup.number().notRequired(),

        // Permanent Address
        permanentAddress1: yup.string().notRequired(),
        permanentAddress2: yup.string().notRequired(),
        permanentAddress3: yup.string().notRequired(),
        permanentCity: yup.string().notRequired(),
        permanentStateId: yup.number().nullable().notRequired(),
        selectedpermanentState: yup.string().notRequired(),
        permanentCountryId: yup.number().nullable().notRequired(),
        selectedpermanentCountry: yup.string().notRequired(),
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

        // Family 
        
        fatherName: yup.string().required('Name is required'),
        fatherEducationQualification: yup.string().notRequired(),
        fatherOccupation: yup.string().notRequired(),
        fatherDesignation: yup.string().notRequired(),
        fatherOrganizationInstitution: yup.string().notRequired(),
        fatherOfficeAddress: yup.string().notRequired(),
        fatherResidentialAddress: yup.string().notRequired(),
        fatherAnnualIncome: yup.number().notRequired(),
        fatherMobileNumber: yup.number().notRequired(),
        fatherEmail: yup.string().notRequired(),
        fatherAadharNumber: yup.number().notRequired(),

        motherName: yup.string().required('Name is required'),
        motherEducationQualification: yup.string().notRequired(),
        motherOccupation: yup.string().notRequired(),
        motherDesignation: yup.string().notRequired(),
        motherOrganizationInstitution: yup.string().notRequired(),
        motherOfficeAddress: yup.string().notRequired(),
        motherResidentialAddress: yup.string().notRequired(),
        motherAnnualIncome: yup.number().notRequired(),
        motherMobileNumber: yup.number().notRequired(),
        motherEmail: yup.string().notRequired(),
        motherAadharNumber: yup.number().notRequired(),

        guardianName: yup.string().required('Name is required'),
        guardianEducationQualification: yup.string().notRequired(),
        guardianOccupation: yup.string().notRequired(),
        guardianDesignation: yup.string().notRequired(),
        guardianOrganizationInstitution: yup.string().notRequired(),
        guardianOfficeAddress: yup.string().notRequired(),
        guardianResidentialAddress: yup.string().notRequired(),
        guardianAnnualIncome: yup.number().notRequired(),
        guardianMobileNumber: yup.number().notRequired(),
        guardianEmail: yup.string().notRequired(),
        guardianAadharNumber: yup.number().notRequired(),

            // Fees

        feesCategoryId: yup.number().notRequired(),
        selectedFeesCategory: yup.object().notRequired(),
        paymentMethodId: yup.number().notRequired(),
        selectedPaymentMethod: yup.object().notRequired(),
        feesStatusId: yup.number().notRequired(),
        selectedFeesStatus: yup.object().notRequired(),

        modeofTransportId: yup.number().notRequired(),
        selectedModeofTransport: yup.object().notRequired(),


        selectedRTE: yup.object().notRequired(),

        totalPresent: yup.number().notRequired(),
		totalLate: yup.number().notRequired(),
		totalAbsent: yup.number().notRequired(),
		totalHalfDay: yup.number().notRequired(),
		totalHoliday: yup.number().notRequired(),

        isActive: yup.boolean().nullable(),
        userId: yup.number().nullable(),
        ipAddress: yup.string().nullable()

    })

});

