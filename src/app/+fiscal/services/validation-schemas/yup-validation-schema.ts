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
    InstitutionId: yup.number().nullable().notRequired(),
    InstitutionName: yup.string().required('Name of the School is required'),
    OrganizationId: yup.number().nullable().notRequired(),
    SelectedOrganization: yup.object().required('Organization Name is required'),
    Name: yup.string().nullable().notRequired(),
    ShortName: yup.string().required('Short Name is required'),
    UDISECode: yup.string().required('UDISE Code is required'),

    StateId: yup.number().nullable().notRequired(),
    SelectedState: yup.object().nullable().notRequired(),
    City: yup.string().nullable().notRequired(),
    Block: yup.string().nullable().notRequired(),
    LocationId: yup.number().nullable().notRequired(),
    SelectedLocation: yup.object().nullable().notRequired(),
    Cluster: yup.string().nullable().notRequired(),
    Ward: yup.string().nullable().notRequired(),
    Mohalla: yup.string().nullable().notRequired(),
    PINCode: yup.number().nullable().notRequired(),
    Panchayat: yup.string().nullable().notRequired(),
    Municipality: yup.string().nullable().notRequired(),

    SchoolCategoryId: yup.number().nullable().notRequired(),
    SelectedCategory: yup.object().nullable().notRequired(),

    StateManagementId: yup.number().nullable().notRequired(),
    StateManagement: yup.object().nullable().notRequired(),

    NationalManagementId: yup.number().nullable().notRequired(),
    NationalManagement: yup.object().nullable().notRequired(),

    SchoolTypeId: yup.number().nullable().notRequired(),
    SelectedschoolType: yup.object().nullable().notRequired(),

    ClassFrom: yup.number().nullable().notRequired(),
    ClassTo: yup.number().nullable().notRequired(),

    IsPrePrimary: yup.boolean().nullable(),
    SelectedPrePrimary: yup.object().nullable().notRequired(),

    MediumofInstruction: yup.string().nullable().notRequired(),
    SelectedMedium : yup.object().nullable().notRequired(),

    
    // selectedMedium: yup.object().nullable().notRequired(),

    // Address Details
    RegAddress1: yup.string().nullable().notRequired(),
    RegAddress2: yup.string().nullable().notRequired(),
    RegAddress3: yup.string().nullable().notRequired(),
    RegAddress4: yup.string().nullable().notRequired(),
    RegCity: yup.string().nullable().notRequired(),
    RegStateId: yup.number().nullable().notRequired(),
    RegSelectedState : yup.object().nullable().notRequired(),
    RegCountryId: yup.number().nullable().notRequired(),
    RegSelectedCountry : yup.object().nullable().notRequired(),
    RegPINCode: yup.number().nullable().notRequired(),
    PhoneNumber1: yup.string().nullable().notRequired(),
    PhoneNumber2: yup.string().nullable().notRequired(),
    Fax: yup.string().nullable().notRequired(),
    MobileNumber1: yup.string().nullable().notRequired(),
    MobileNumber2: yup.string().nullable().notRequired(),
    PrimaryEmail: yup.string().email().nullable().notRequired(),
    SecondaryEmail: yup.string().email().nullable().notRequired(),
    Website: yup.string().nullable().notRequired(),


    // // Management Info
    YearofEstablishment:  yup.number().nullable().notRequired(),
    YearofRecognition_Primary:  yup.number().nullable().notRequired(),
    YearofRecognition_UpperPrimary:  yup.number().nullable().notRequired(),
    YearofRecognition_Secondary:  yup.number().nullable().notRequired(),
    YearofRecognition_HigherSecondary:  yup.number().nullable().notRequired(),
    AffiliationBoard_Secondary:  yup.number().nullable().notRequired(),
    AffiliationBoard_HigherSecondary:  yup.number().nullable().notRequired(),
    IsMinoritySchool: yup.boolean().nullable(),
    SelectedMinoritySchool : yup.object().nullable().notRequired(),
    IsthisaShiftSchool: yup.boolean().nullable(),
    SelectedIsthisaShiftSchool : yup.object().nullable().notRequired(),
    BuildingStatusId:  yup.number().nullable().notRequired(),
    SelectedBuildingStatus : yup.object().nullable().notRequired(),
    BoundaryWallId:  yup.number().nullable().notRequired(),
    SelectedBoundaryWall : yup.object().nullable().notRequired(),
    NoofBuildingBlocks:  yup.number().nullable().notRequired(),
    NoofPuccaBuildingBlocks:  yup.number().nullable().notRequired(),
    IsSpecialSchoolforCWSN: yup.boolean().nullable(),
    SelectedIsSpecialSchoolforCWSN : yup.object().nullable().notRequired(),
    AvailabilityofRamps: yup.boolean().nullable(),
    SelectedAvailabilityofRamps : yup.object().nullable().notRequired(),
    AvailabilityofHandrails: yup.boolean().nullable(),
    SelectedAvailabilityofHandrails : yup.object().nullable().notRequired(),
    TotalNoOfToilets_Boys:  yup.number().nullable().notRequired(),
    TotalNoOfToilets_Girls:  yup.number().nullable().notRequired(),
    Functional_Boys:  yup.number().nullable().notRequired(),
    Functional_Girls:  yup.number().nullable().notRequired(),
    FunctionalCWSNFriendly_Boys:  yup.number().nullable().notRequired(),
    FunctionalCWSNFriendly_Girls:  yup.number().nullable().notRequired(),
    Urinal_Boys:  yup.number().nullable().notRequired(),
    Urinal_Girls:  yup.number().nullable().notRequired(),
    HandwashNearToilet: yup.boolean().nullable(),
    SelectedHandwashNearToilet : yup.object().nullable().notRequired(),
    HandwashFacilityforMeal: yup.boolean().nullable(),
    SelectedHandwashFacilityforMeal : yup.object().nullable().notRequired(),
    DrinkingWaterAvailable: yup.boolean().nullable(),
    SelectedDrinkingWaterAvailable : yup.object().nullable().notRequired(),
    DrinkingWaterFunctional: yup.boolean().nullable(),
    SelectedDrinkingWaterFunctional : yup.object().nullable().notRequired(),
    RainWaterHarvesting: yup.boolean().nullable(),
    SelectedRainWaterHarvesting : yup.object().nullable().notRequired(),
    PlaygroundAvailable: yup.boolean().nullable(),
    SelectedPlaygroundAvailable : yup.object().nullable().notRequired(),
    NoofBuildingsInGoodCondition:  yup.number().nullable().notRequired(),
    NoofBuildingNeedsMinorRepair:  yup.number().nullable().notRequired(),
    NoofBuildingNeedsMajorRepair:  yup.number().nullable().notRequired(),
    OtherRooms:  yup.number().nullable().notRequired(),
    LibraryAvailability: yup.boolean().nullable(),
    SelectedLibraryAvailability : yup.object().nullable().notRequired(),
    SeparateRoomforHM: yup.boolean().nullable(),
    SelectedSeparateRoomforHM : yup.object().nullable().notRequired(),
    FurnitureAvailability: yup.boolean().nullable(),
    SelectedFurnitureAvailability : yup.object().nullable().notRequired(),
    ElectricityAvailability: yup.boolean().nullable(),
    SelectedElectricityAvailability : yup.object().nullable().notRequired(),
    SolarPanel: yup.boolean().nullable(),
    SelectedSolarPanel : yup.object().nullable().notRequired(),
    Medicalcheckups: yup.boolean().nullable(),
    SelectedMedicalcheckups : yup.object().nullable().notRequired(),


    // Digital Facility Info

    ICTLab: yup.boolean().nullable(),
    SelectedICTLab : yup.object().nullable().notRequired(),
    InternetConnection: yup.boolean().nullable(),
    SelectedInternetConnection : yup.object().nullable().notRequired(),
    DTHConnection: yup.boolean().nullable(),
    SelectedDTHConnection : yup.object().nullable().notRequired(),
    NoofDesktop: yup.number().nullable().notRequired(),
    NoofLaptop: yup.number().nullable().notRequired(),
    NoofTablet: yup.number().nullable().notRequired(),
    NoofPrinter: yup.number().nullable().notRequired(),
    NoofProjector: yup.number().nullable().notRequired(),
    NoofDigiBoard: yup.number().nullable().notRequired(),

    // Teachers Info

    NoofTeachers_Primary:  yup.number().nullable().notRequired(),
    NoofTeachers_PrimaryandUpperPrimary:  yup.number().nullable().notRequired(),
    NoofTeachers_HigerSecondaryOnly:  yup.number().nullable().notRequired(),
    NoofTeachers_SecondaryandHigerSecondary:  yup.number().nullable().notRequired(),
    NoofTeachers_PrePrimaryandPrimary:  yup.number().nullable().notRequired(),
    NoofTeachers_UpperPrimary:  yup.number().nullable().notRequired(),
    NoofTeachers_SecondaryOnly:  yup.number().nullable().notRequired(),
    NoofTeachers_UpperPrimaryandSecondary:  yup.number().nullable().notRequired(),
    NoofTeachers_PrePrimaryOnly:  yup.number().nullable().notRequired(),
    NoofTeachers_Regular:  yup.number().nullable().notRequired(),
    NoofTeachers_Parttime:  yup.number().nullable().notRequired(),
    NoofTeachers_Contract:  yup.number().nullable().notRequired(),
    NoofTeachers_Male:  yup.number().nullable().notRequired(),
    NoofTeachers_Female:  yup.number().nullable().notRequired(),
    NoofTeachers_Transgender:  yup.number().nullable().notRequired(),
    TotalNoofTeachers:  yup.number().nullable().notRequired(),
    NoofTotalTeacherReceivedServiceTraining:  yup.number().nullable().notRequired(),
    TotalTeacherInvolveinNonTeachingAssignment:  yup.number().nullable().notRequired(),
    NoofTeachers_BelowGraduate:  yup.number().nullable().notRequired(),
    NoofTeachers_Graduate:  yup.number().nullable().notRequired(),
    NoofTeachers_PostGraduateandAbove:  yup.number().nullable().notRequired(),
    NoofTotalTeachersTrainedinComputer:  yup.number().nullable().notRequired(),
    NoofTeachers_AgedAbove55:  yup.number().nullable().notRequired(),
    NoofTeachers_DiplomaorCertificateinbasicteacherstraining:  yup.number().nullable().notRequired(),
    NoofTeachers_BachelorofElementaryEducation:  yup.number().nullable().notRequired(),
    NoofTeachers_BEdorEquivalent:  yup.number().nullable().notRequired(),
    NoofTeachers_MEdorEquivalent:  yup.number().nullable().notRequired(),
    NoofTeachers_DiplomaorDegreeinSpecialEducation:  yup.number().nullable().notRequired(),
    NoofTeachers_PursuinganyRelevantProfessionalCourse:  yup.number().nullable().notRequired(),
    

    IsActive: yup.boolean().nullable(),
    UserId: yup.number().nullable(),
    IPAddress: yup.string().nullable()
  }),

  MISC: yup.object().shape({
    miscId: yup.number().nullable(),
    name: yup.string().nullable().required('Name is required'),
    description: yup.string().nullable().required('Description is required'),
    selectedMiscName: yup.object().nullable().notRequired(),
    keyWord:yup.string().nullable().notRequired(),
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

