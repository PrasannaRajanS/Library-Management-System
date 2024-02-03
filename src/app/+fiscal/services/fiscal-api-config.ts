export const FiscalAPIConfig = {
    API_CONFIG: {
        API_URL: {
            MASTER: {
                ORGANIZATION: {
                    SAVE: "Organization/Create",
                    UPDATE: "Organization/Update",
                    DELETE: "Organization/Delete",
                    LIST: "Organization/GetAllOrganizations",
                    EDIT: "Organization/GetOrganizationById",
                    GET_COUNTRIES: "Organization/GetCountries",
                    GET_STATES: "Organization/GetStates",
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


