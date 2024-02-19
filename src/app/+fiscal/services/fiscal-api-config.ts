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
                    LIST: "/Fiscal/Institution/GetAllInstitutions",
                    EDIT:"/Fiscal/Institution/GetInstitutionById",
                    DATA:"/Fiscal/Institution/GetInstitutionsData"
                },
                ACADEMIC_YEAR: {
                    SAVE: "/academicyear/Create",
                    UPDATE: "/academicyear/Update",
                    DELETE: "/academicyear/Delete",
                    LIST: "/academicyear/GetAcademicYears"
                },
                
                FISCAL: {
                    SAVE: "/Fiscal/Miscellaneous/Create",
                    UPDATE: "/Fiscal/Miscellaneous/Update",
                    DELETE: "/Fiscal/Miscellaneous/Delete",
                    LIST: "/Fiscal/Miscellaneous/GetAllMiscs",
                    EDIT:"/Fiscal/Miscellaneous/GetMiscById",
                    CREATE_UPDATE_DELETE:"/Fiscal/Miscellaneous/MiscDetailCreate",
                    DETAILS:"/Fiscal/Miscellaneous/GetAllMiscDetails",
                    
                },
                PMS:{

                    SAVE: "/PMS/Miscellaneous/Create",
                    UPDATE: "/PMS/Miscellaneous/Update",
                    DELETE: "/PMS/Miscellaneous/Delete",
                    LIST: "/PMS/Miscellaneous/GetAllMiscs",
                    EDIT:"/PMS/Miscellaneous/GetMiscById",
                    CREATE_UPDATE_DELETE:"/PMS/Miscellaneous/MiscDetailCreate",
                    DETAILS:"/PMS/Miscellaneous/GetAllMiscDetails",
                    
                },
                SCHOOL:{
                    SAVE: "/School/Miscellaneous/Create",
                    UPDATE: "/School/Miscellaneous/Update",
                    DELETE: "/School/Miscellaneous/Delete",
                    LIST: "/School/Miscellaneous/GetAllMiscs",
                    EDIT:"/School/Miscellaneous/GetMiscById",
                    CREATE_UPDATE_DELETE:"/School/Miscellaneous/MiscDetailCreate",
                    DETAILS:"/School/Miscellaneous/GetAllMiscDetails",
                    
                },


            }
        }
    }
}









