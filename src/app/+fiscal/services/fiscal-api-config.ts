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
                
                Misc: {
                    SAVE: "/Misc/Create",
                    UPDATE: "/Misc/Update",
                    DELETE: "/Misc/Delete",
                    LIST: "/Misc/GetMisc"
                },
            }
        }
    }
}


