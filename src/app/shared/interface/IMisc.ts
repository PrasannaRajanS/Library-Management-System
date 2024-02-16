export interface IMisc {
    miscId?: number | null | undefined;
    name?: string | null | undefined;
    description?: string | null | undefined;

    selectedMiscName?: object | null | undefined;
    isActive?: boolean | null | undefined;
    unitId?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
    keyWord?:string | null | undefined;
}



export interface IMiscDetails {

    miscDtlId?: number | null | undefined;
    miscId?: number | null | undefined;
    // neeed ? 
    miscName?:string|null|undefined;
    miscDtlName?: string | null | undefined;
    miscDtlDesc?: string | null | undefined;
    selectedMiscName?:any | null | undefined;
    edit?: boolean | null | undefined;

    createdby?: string | null | undefined;
    createdDate?: string | null | undefined;

    isActive?: boolean | null | undefined;
    unitId?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}
