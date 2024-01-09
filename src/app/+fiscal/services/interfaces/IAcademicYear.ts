export interface IAcademicYear {
    academicYearId?: number | null | undefined;
    academicYear?: string | null | undefined;
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
    accountYear?: number | null | undefined;
    isDefault: boolean | null | undefined;

    isActive?: boolean | null | undefined;
    userId?: number | null | undefined;
    ipAddress?: string | null | undefined;
}