export const FiscalAPIConfig = {

    FISCAL_API_BASE_URL: "https://localhost:7189",


    API_CONFIG: {
        API_URL: {
            MASTER: {
                ACADEMIC_YEAR: {
                    SAVE: "/academicyear/Create",
                    UPDATE: "/academicyear/Update",
                    DELETE: "/academicyear/Delete",
                    LIST: "/academicyear/GetAcademicYears"
                },
                ORGANIZATION: {
                    SAVE: "/ORGANIZATION/Create",
                    UPDATE: "/ORGANIZATION/Update",
                    DELETE: "/ORGANIZATION/Delete",
                    LIST: "/ORGANIZATION/GetOrganization"
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


