export const FiscalAPIConfig = {
    API_CONFIG: {
        API_URL: {
            MASTER: {
                ORGANIZATION: {
                    SAVE: "/Fiscal/Organization/Create",
                    UPDATE: "/Fiscal/Organization/Update",
                    DELETE: "/Fiscal/Organization/Delete",
                    LIST: "/Fiscal/Organization/GetAllOrganizations",
                    EDIT: "/Fiscal/Organization/GetOrganizationById",
                    
                },
                Institution: {
                    SAVE: "/Fiscal/Institution/Create",
                    UPDATE: "/Fiscal/Institution/Update",
                    DELETE: "/Fiscal/Institution/Delete",
                    LIST: "/Fiscal/Institution/GetInstitution",
                    EDIT:"/Fiscal/Institution/GetInstitutionById",
                    DATA:"/Fiscal/Institution/GetInstitutionsData"
                },
                ACADEMIC_YEAR: {
                    SAVE: "/academicyear/Create",
                    UPDATE: "/academicyear/Update",
                    DELETE: "/academicyear/Delete",
                    LIST: "/academicyear/GetAcademicYears"
                },
                
                MISC: {
                    SAVE: "/Fiscal/Miscellaneous/Create",
                    UPDATE: "/Fiscal/Miscellaneous/Update",
                    DELETE: "/Fiscal/Miscellaneous/Delete",
                    LIST: "/Fiscal/Miscellaneous/GetAllMiscs",
                    EDIT:"/Fiscal/Miscellaneous/GetMiscById",
                    CREATE:"/Fiscal/Miscellaneous/MiscDetailCreate",
                    DETAILS:"/Fiscal/Miscellaneous/GetAllMiscDetails",
                    
                },
            }
        }
    }
}
