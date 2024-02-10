import * as yup from "yup";

export const YupFiscalValidation = Object.freeze({

  ACADEMIC_YEAR: yup.object().shape({
    academicYearId: yup.number().nullable(),
    academicYear: yup.array().required('Academic Year is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required('End Date is required'),
    accountYear: yup.date().required('Account Year is required'),
    isDefault: yup.object().nullable(),

    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),

  ORGANIZATION: yup.object().shape({
    organizationId: yup.number().nullable(),
    name: yup.string().required('Name is required'),
    shortName: yup.string().required('Short Name is required'),

    address1: yup.string().nullable().notRequired(),
    address2: yup.string().nullable().notRequired(),
    address3: yup.string().nullable().notRequired(),
    address4: yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),

    stateId: yup.number().nullable().notRequired(),
    // stateName: yup.string().nullable().notRequired(),
    selectedState: yup.object().nullable().notRequired(),

    countryId: yup.number().nullable().notRequired(),

    // countryName: yup.string().nullable().notRequired(),
    selectedCountry: yup.object().nullable().notRequired(),

    pinCode: yup.string().nullable().notRequired(),
    phoneNumber: yup.string().nullable().notRequired(),
    fax: yup.string().nullable().notRequired(),
    mobileNumber: yup.string().nullable().notRequired(),
    email: yup.string().email().nullable().notRequired(),
    website: yup.string().nullable().notRequired(),
    logoURL: yup.string().url().notRequired(),
    iconURL: yup.string().url().notRequired(),

    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),

  INSTITUTION: yup.object().shape({

    institutionId: yup.number().nullable().notRequired(),
    institutionName: yup.string().required('Name of the School is required'),
    organizationId: yup.number().nullable().notRequired(),
    selectedOrganization: yup.object().required('Organization Name is required'),
    name: yup.string().nullable().notRequired(),
    shortName: yup.string().required('Short Name is required'),
    UDISECode: yup.string().required('UDISE Code is required'),

    stateId: yup.number().nullable().notRequired(),
    selectedState: yup.object().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    block: yup.string().nullable().notRequired(),
    locationId: yup.number().nullable().notRequired(),
    selectedLocation: yup.object().nullable().notRequired(),
    cluster: yup.string().nullable().notRequired(),
    ward: yup.string().nullable().notRequired(),
    mohalla: yup.string().nullable().notRequired(),
    pinCode: yup.number().nullable().notRequired(),
    panchayat: yup.string().nullable().notRequired(),
    municipality: yup.string().nullable().notRequired(),
    schoolCategoryId: yup.number().nullable().notRequired(),
    selectedCategory: yup.object().nullable().notRequired(),
    stateManagementId: yup.number().nullable().notRequired(),
    stateManagement: yup.object().nullable().notRequired(),
    nationalManagementId: yup.number().nullable().notRequired(),
    nationalManagement: yup.object().nullable().notRequired(),
    schoolTypeId: yup.number().nullable().notRequired(),
    selectedschoolType: yup.object().nullable().notRequired(),
    classFrom: yup.number().nullable().notRequired(),
    classTo: yup.number().nullable().notRequired(),
    isPrePrimary: yup.boolean().nullable(),
    selectedPrePrimary: yup.object().nullable().notRequired(),

    mediumId: yup.boolean().nullable(),
    selectedMedium: yup.object().nullable().notRequired(),

    // Address Details
    regAddress1: yup.string().nullable().notRequired(),
    regAddress2: yup.string().nullable().notRequired(),
    regAddress3: yup.string().nullable().notRequired(),
    regAddress4: yup.string().nullable().notRequired(),
    regCity: yup.string().nullable().notRequired(),
    regStateId: yup.number().nullable().notRequired(),
    regSelectedState: yup.object().nullable().notRequired(),
    regCountryId: yup.number().nullable().notRequired(),
    regSelectedCountry: yup.object().nullable().notRequired(),
    regPINCode: yup.number().nullable().notRequired(),
    phoneNumber1: yup.string().nullable().notRequired(),
    phoneNumber2: yup.string().nullable().notRequired(),
    fax: yup.string().nullable().notRequired(),
    mobileNumber1: yup.string().nullable().notRequired(),
    mobileNumber2: yup.string().nullable().notRequired(),
    primaryEmail: yup.string().email().nullable().notRequired(),
    secondaryEmail: yup.string().email().nullable().notRequired(),
    website: yup.string().nullable().notRequired(),

    // Management Info
    yearofEstablishment: yup.number().nullable().notRequired(),
    yearofRecognition_Primary: yup.number().nullable().notRequired(),
    yearofRecognition_UpperPrimary: yup.number().nullable().notRequired(),
    yearofRecognition_Secondary: yup.number().nullable().notRequired(),
    yearofRecognition_HigherSecondary: yup.number().nullable().notRequired(),
    affiliationBoard_Secondary: yup.number().nullable().notRequired(),
    affiliationBoard_HigherSecondary: yup.number().nullable().notRequired(),
    isMinoritySchool: yup.boolean().nullable(),
    selectedMinoritySchool: yup.object().nullable().notRequired(),
    isthisaShiftSchool: yup.boolean().nullable(),
    selectedIsthisaShiftSchool: yup.object().nullable().notRequired(),
    buildingStatusId: yup.number().nullable().notRequired(),
    selectedBuildingStatus: yup.object().nullable().notRequired(),
    boundaryWallId: yup.number().nullable().notRequired(),
    selectedBoundaryWall: yup.object().nullable().notRequired(),
    noofBuildingBlocks: yup.number().nullable().notRequired(),
    noofPuccaBuildingBlocks: yup.number().nullable().notRequired(),
    isSpecialSchoolforCWSN: yup.boolean().nullable(),
    selectedIsSpecialSchoolforCWSN: yup.object().nullable().notRequired(),
    availabilityofRamps: yup.boolean().nullable(),
    selectedAvailabilityofRamps: yup.object().nullable().notRequired(),
    availabilityofHandrails: yup.boolean().nullable(),
    selectedAvailabilityofHandrails: yup.object().nullable().notRequired(),
    totalNoOfToilets_Boys: yup.number().nullable().notRequired(),
    totalNoOfToilets_Girls: yup.number().nullable().notRequired(),
    functional_Boys: yup.number().nullable().notRequired(),
    functional_Girls: yup.number().nullable().notRequired(),
    functionalCWSNFriendly_Boys: yup.number().nullable().notRequired(),
    functionalCWSNFriendly_Girls: yup.number().nullable().notRequired(),
    urinal_Boys: yup.number().nullable().notRequired(),
    urinal_Girls: yup.number().nullable().notRequired(),
    handwashNearToilet: yup.boolean().nullable(),
    selectedHandwashNearToilet: yup.object().nullable().notRequired(),
    handwashFacilityforMeal: yup.boolean().nullable(),
    selectedHandwashFacilityforMeal: yup.object().nullable().notRequired(),
    drinkingWaterAvailable: yup.boolean().nullable(),
    selectedDrinkingWaterAvailable: yup.object().nullable().notRequired(),
    drinkingWaterFunctional: yup.boolean().nullable(),
    selectedDrinkingWaterFunctional: yup.object().nullable().notRequired(),
    rainWaterHarvesting: yup.boolean().nullable(),
    selectedRainWaterHarvesting: yup.object().nullable().notRequired(),
    playgroundAvailable: yup.boolean().nullable(),
    selectedPlaygroundAvailable: yup.object().nullable().notRequired(),
    noofBuildingsInGoodCondition: yup.number().nullable().notRequired(),
    noofBuildingNeedsMinorRepair: yup.number().nullable().notRequired(),
    noofBuildingNeedsMajorRepair: yup.number().nullable().notRequired(),
    otherRooms: yup.number().nullable().notRequired(),
    libraryAvailability: yup.boolean().nullable(),
    selectedLibraryAvailability: yup.object().nullable().notRequired(),
    separateRoomforHM: yup.boolean().nullable(),
    selectedSeparateRoomforHM: yup.object().nullable().notRequired(),
    furnitureAvailability: yup.boolean().nullable(),
    selectedFurnitureAvailability: yup.object().nullable().notRequired(),
    electricityAvailability: yup.boolean().nullable(),
    selectedElectricityAvailability: yup.object().nullable().notRequired(),
    solarPanel: yup.boolean().nullable(),
    selectedSolarPanel: yup.object().nullable().notRequired(),
    medicalcheckups: yup.boolean().nullable(),
    selectedMedicalcheckups: yup.object().nullable().notRequired(),


    // Digital Facility Info

    iCTLab: yup.boolean().nullable(),
    selectedICTLab: yup.object().nullable().notRequired(),
    internetConnection: yup.boolean().nullable(),
    selectedInternetConnection: yup.object().nullable().notRequired(),
    dTHConnection: yup.boolean().nullable(),
    selectedDTHConnection: yup.object().nullable().notRequired(),
    noofDesktop: yup.number().nullable().notRequired(),
    noofLaptop: yup.number().nullable().notRequired(),
    noofTablet: yup.number().nullable().notRequired(),
    noofPrinter: yup.number().nullable().notRequired(),
    noofProjector: yup.number().nullable().notRequired(),
    noofDigiBoard: yup.number().nullable().notRequired(),

    // Teachers Info

    noofTeachers_Primary: yup.number().nullable().notRequired(),
    noofTeachers_PrimaryandUpperPrimary: yup.number().nullable().notRequired(),
    noofTeachers_HigerSecondaryOnly: yup.number().nullable().notRequired(),
    noofTeachers_SecondaryandHigerSecondary: yup.number().nullable().notRequired(),
    noofTeachers_PrePrimaryandPrimary: yup.number().nullable().notRequired(),
    noofTeachers_UpperPrimary: yup.number().nullable().notRequired(),
    noofTeachers_SecondaryOnly: yup.number().nullable().notRequired(),
    noofTeachers_UpperPrimaryandSecondary: yup.number().nullable().notRequired(),
    noofTeachers_PrePrimaryOnly: yup.number().nullable().notRequired(),
    noofTeachers_Regular: yup.number().nullable().notRequired(),
    noofTeachers_Parttime: yup.number().nullable().notRequired(),
    noofTeachers_Contract: yup.number().nullable().notRequired(),
    noofTeachers_Male: yup.number().nullable().notRequired(),
    noofTeachers_Female: yup.number().nullable().notRequired(),
    noofTeachers_Transgender: yup.number().nullable().notRequired(),
    totalNoofTeachers: yup.number().nullable().notRequired(),
    noofTotalTeacherReceivedServiceTraining: yup.number().nullable().notRequired(),
    totalTeacherInvolveinNonTeachingAssignment: yup.number().nullable().notRequired(),
    noofTeachers_BelowGraduate: yup.number().nullable().notRequired(),
    noofTeachers_Graduate: yup.number().nullable().notRequired(),
    noofTeachers_PostGraduateandAbove: yup.number().nullable().notRequired(),
    noofTotalTeachersTrainedinComputer: yup.number().nullable().notRequired(),
    noofTeachers_AgedAbove55: yup.number().nullable().notRequired(),
    noofTeachers_DiplomaorCertificateinbasicteacherstraining: yup.number().nullable().notRequired(),
    noofTeachers_BachelorofElementaryEducation: yup.number().nullable().notRequired(),
    noofTeachers_BEdorEquivalent: yup.number().nullable().notRequired(),
    noofTeachers_MEdorEquivalent: yup.number().nullable().notRequired(),
    noofTeachers_DiplomaorDegreeinSpecialEducation: yup.number().nullable().notRequired(),
    noofTeachers_PursuinganyRelevantProfessionalCourse: yup.number().nullable().notRequired(),


    isActive: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),

  MISC: yup.object().shape({
    miscId: yup.number().nullable(),
    name: yup.string().nullable().required('Name is required'),
    description: yup.string().nullable().required('Description is required'),
    selectedMiscName: yup.object().nullable().notRequired(),
    isActive: yup.boolean().nullable(),
    unitId: yup.boolean().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable()
  }),
  // PMSMISC: yup.object().shape({
  //   PMSMiscId: yup.number().nullable(),
  //   PMSMiscName: yup.string().nullable().required('Name is required'),
  //   PMSMiscDescription: yup.string().nullable().required('Description is required'),
  //   selectedPMSMiscName: yup.object().nullable().notRequired(),
  //   isActive: yup.boolean().nullable(),
  //   unitId: yup.boolean().nullable(),
  //   userId: yup.number().nullable(),
  //   ipAddress: yup.string().nullable()
  // }),

});

