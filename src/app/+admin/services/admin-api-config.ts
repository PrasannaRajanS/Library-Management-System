export const AdminAPIConfig = {

    API_CONFIG: {
        API_URL: {
            ADMIN: {
                APPLICATION: {
                    SAVE: "/application/Create",
                    UPDATE: "/application/Update",
                    DELETE: "/application/Delete",
                    LIST: "/application/GetApplications"
                },
                MODULE: {
                    SAVE: "/module/Create",
                    UPDATE: "/module/Update",
                    DELETE: "/module/Delete",
                    LIST: "/module/GetModules"
                },
                PAGE_CREATION: {
                    SAVE: "/page/Create",
                    UPDATE: "/page/Update",
                    DELETE: "/page/Delete",
                    LIST: "/page/GetPages",
                    EDIT: "/page/GetPageById",
                    MAIN_PAGE_LIST: "/page/GetMainPages",
                },
                ROLE_CREATION: {
                    SAVE: "/role/Create",
                    UPDATE: "/role/Update",
                    DELETE: "/role/Delete",
                    LIST: "/role/GetRoles"
                },
                ROLE_PAGE_ASSOCIATION: {
                    GET_ROLE_PAGES: "/page/GetAllPagesByRoleId",
                    SAVE: ""
                },
                USER: {
                    SAVE: "/user/Create",
                    UPDATE: "/user/Update",
                    DELETE: "/user/Delete",
                    EDIT: "/user/GeUserById",
                    LIST: "/user/GetUsers",
                    
                    EMPOLOYEES_LIST: "/user/GetEmployees",
                    DEFAULT_PAGE_LIST: "/user/GetDefaultPages",
                    UNIT_LIST: "/user/GetUnits",
                }

            }
        }
    }
}


