export interface IAdmission{

    studentApplicationNo?:string|null|undefined;
    studentStandard?:string|null|undefined;
    studentAcademicYear?:string|null|undefined;
    studentAdmissionNo?:string|null|undefined;

    selectedPresentCountry?:string|null|undefined;
    selectedPresentState?:string|null|undefined;
    selectedPermanentCountry?:string|null|undefined;
    

    selectedState:any|null|undefined;
    selectedCountry:any|null|undefined;
    
 
    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}

export interface IStandard{
    standardId?:number|null|undefined;
    standardTypeName?:string|null|undefined;
}

