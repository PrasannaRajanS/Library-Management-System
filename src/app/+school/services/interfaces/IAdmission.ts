export interface IAdmission{

    studentName?:string|null|undefined;
    studentApplicationNo?:string|null|undefined;
    studentStandard?:string|null|undefined;
    studentAcademicYear?:string|null|undefined;
    studentAdmissionNo?:string|null|undefined;

    selectedPresentCountry?:string|null|undefined;
    selectedPresentState?:string|null|undefined;
    selectedPermanentCountry?:string|null|undefined;

    // STUDENT INFO
    selectedGender?:any|null|undefined;
    selectedNationality?:any|null|undefined;
    selectedReligion?:any|null|undefined;
    selectedMotherTongue?:any|null|undefined;
    selectedBloodGroup?:any|null|undefined;
    selectedCommunity?:any|null|undefined;
    selectedVisaIssuedCountry?:any|null|undefined;
    selectedPermanentStateList?:any|null|undefined;
    selectedPermanentCountryList?:any|null|undefined;
    selectedcommunicationStateList?:any|null|undefined;
    selectedcommunicationCountryList?:any|null|undefined;


    // PARENT INFO
    selectedFatherQualification?:any|null|undefined;
    selectedMotherQualification?:any|null|undefined;
    selectedGuardianQualification?:any|null|undefined;
    selectedTransportation?:any|null|undefined;
    selectedChildIsLivingWith?:any|null|undefined;
     
    // PRE CLASS INFO
    selectedStudied?:any|null|undefined;
    selectedMediumOfInstruction?:any|null|undefined;
    selectedBoard?:any|null|undefined;

    selectedState?:any|null|undefined;
    selectedCountry?:any|null|undefined;
    
 
    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}

export interface IStandard{
    standardId?:number|null|undefined;
    standardTypeName?:string|null|undefined;
}
export interface IGender{
    genderId?: number | null | undefined;
    genderName?: string | null | undefined;
}
export interface IReligion{
    religionId?: number | null | undefined;
    religionName?: string | null | undefined;
} 
export interface IMotherTongue{
    mothertongueId?: number | null | undefined;
    mothertongueName?: string | null | undefined;
}


