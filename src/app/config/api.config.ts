export const APIConfig = {
     
     API_BASE_URL: "http://academic-api.kangayaa.com",
     URL: "http://kangayaa-001-site3.ftempurl.com/",

     ADMIN_API_BASE_URL: "http://academic-api.kangayaa.com",
     FISCAL_API_BASE_URL: "http://academic-api.kangayaa.com/Fiscal/",

    //  ADMIN_API_BASE_URL: "https://localhost:7189",
    //  FISCAL_API_BASE_URL: "https://localhost:7189/Fiscal/",

    //  http://academy-portal.kangayaa.com/


    API_CONFIG: {
        API_URL: {
            LOGIN: {
                PFL_lOGIN: "loginapi",
                GET_UNIT_DETAIL: "/Login/GetUnitInfo"
            },
            ADMIN: {
                MODULE: {
                    LIST: "/Module/List"
                }
            },
            COMMON:
            {
                GET_CITY: "/PMSMaster/GetCityDetails",
                GET_STATE: "/PMSMaster/GetStateDetails",
                GET_COUNTRY: "/PMSMaster/GetCountryDetails",
            }
        }
    },
    NON_SECURE_ROUTERS: ['/login'],
};


