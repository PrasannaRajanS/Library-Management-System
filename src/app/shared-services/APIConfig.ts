export const APIConfig = {

     APIURL: "https://localhost:7189/api",
     URL: "https://localhost:7189/",

    // APIURL: "http://administrator-api.kangayaa.com/api/",
    // URL: "http://administrator-api.kangayaa.com/",


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


