// PMS misc details start

export interface IBloodGroup {
    bloodGroupId?: number | null | undefined;
    bloodGroupName?: string | null | undefined;
}

export interface IEmployeeCategory{
    empCategoryId?: number | null | undefined;
    employeeCategoryName?: string | null | undefined;
}

export interface IDepartment{
    departmentId?: number | null | undefined;
    departmentName?: string | null | undefined;
}

export interface IEmploymentTypes{
    employeementTypeId?: number | null | undefined;
    employmentTypesName?: string | null | undefined;
}

export interface ISalaryType{
    salaryTypeId?: number | null | undefined;
    SalaryTypeName?: string | null | undefined;
}

export interface IShifts{
    shiftId?: number | null | undefined;
    shiftTypeName?: string | null | undefined;
}

export interface IDesignations{
    designationId?: number | null | undefined;
    designationName?: string | null | undefined;
}

export interface ICommunity{
    communityId?: number | null | undefined;
    communityName?: string | null | undefined;
}

export interface IEducation{
    educationId?: number | null | undefined;
    educationTypeName?: string | null | undefined;
}



export interface ICourse {
    courseId?: number | null | undefined;
    courseName?: string | null | undefined;
}


export interface ISpecialization {
    specialisationId?: number | null | undefined;
    specialisationName?: string | null | undefined;
}

export interface ICourseType {
    modeOfStudyId?: number | null | undefined;
    modeOfStudyName?: string | null | undefined;
}



export interface ISalutation {
    salutationId?: number | null | undefined;
    salutationName?: string | null | undefined;
}


export interface IGender {
    genderId?: number | null | undefined;
    genderName?: string | null | undefined;
}

// PMS misc details end

// School misc details start

export interface IClass{
    classId?:number|null|undefined;
    className?:string|null|undefined;
}

export interface ISection{
    sectionId?:number|null|undefined;
    sectionName?:string|null|undefined;
}

export interface ITransportation{
    transportationId?: number | null | undefined;
    transportationName?: string | null | undefined;
}
export interface IReligion{
    religionId?: number | null | undefined;
    religionName?: string | null | undefined;
} 
export interface IMotherTongue{
    mothertongueId?: number | null | undefined;
    mothertongueName?: string | null | undefined;
}

export interface IRelationship{
    relationshipId?: number | null | undefined;
    relationshipName?: string | null | undefined;
}


// School misc details end

// Fiscal misc details start

export interface ILocation {
    locationId?: number | null | undefined;
    locationName?: string | null | undefined;
}

export interface ISchoolCategory {
    schoolCategoryId?: number | null | undefined;
    schoolCategoryName?: string | null | undefined;
}

export interface IStateManagement {
    stateManagementId?: number | null | undefined;
    stateManagementName?: string | null | undefined;
}

export interface INationalManagement {
    nationalManagementId?: number | null | undefined;
    nationalManagementName?: string | null | undefined;
}

export interface ISchoolType {
    schoolTypeId?: number | null | undefined;
    schoolTypeName?: string | null | undefined;
}


export interface IMediumofInstruction {
    mediumofInstructionId?: number | null | undefined;
    mediumofInstructionName?: string | null | undefined;
}

export interface IBoard {
    boardId?: number | null | undefined;
    boardName?: string | null | undefined;
}

export interface IBuildingStatus {
    buildingStatusId?: number | null | undefined;
    buildingStatusName?: string | null | undefined;
}


export interface IBoundarywall {
    boundarywallId?: number | null | undefined;
    boundarywallName?: string | null | undefined;
}


// Fiscal misc details end







export interface IAC_Organization {
    organizationId?: number | null | undefined;
    organization?: string | null | undefined;
}





export interface ILabel {
    labelId?: boolean | null | undefined;
    label?: string | null | undefined;
}


export interface IQualification{
    qualificationId?: number | null | undefined;
    qualificationName?: string | null | undefined;
}


export interface IJobTitle {
    jobTitleId?: number | null | undefined;
    jobTitleName?:string | null | undefined;
}
