export interface IMisc{
    miscId:number|null|undefined;
    name:string | null | undefined;
    description:string | null | undefined;

    isActive?: boolean | null | undefined;
    unitId?:boolean|null|undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;

}

export interface IMiscDetails{

    miscDetailId:number|null|undefined;
    name:string | null | undefined;
    description:string | null | undefined;


    isActive?: boolean | null | undefined;
    unitId?:boolean|null|undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;


    
}
