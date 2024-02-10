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
                    SAVE: "/Institution/Create",
                    UPDATE: "/Institution/Update",
                    DELETE: "/Institution/Delete",
                    LIST: "/Institution/GetInstitution",
                    EDIT:"/Institution/GetInstitutionById"
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
                },
            }
        }
    }
}


// /Fiscal/Miscellaneous/Create
// /Fiscal/Miscellaneous/Update
// /Fiscal/Miscellaneous/Delete
// /Fiscal/Miscellaneous/GetAllMiscs
// /Fiscal/Miscellaneous/GetMiscById
// /Fiscal/Miscellaneous/MiscDetailCreate