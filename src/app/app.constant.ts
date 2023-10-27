export const AppConstant = Object.freeze({

  FEATURES: {
    ADMIN: {      
       //LOCAL--TESTING//
       URL:"http://localhost:4200/#/"     
      
    },
    ROUTER_URL:{
      LOGIN:"/Accounts/login"
    }
  },
  API_CONFIG: {
    NOFIG_CONFIG: {
      position: ["top", "right"],
      timeOut: 4000,
      lastOnBottom: true,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 10
    },
    ngxDate: {
      dateFormat: 'dd/mm/yyyy',

    },
    ID:{
        SETID:2,
    },
    LOCALSTORAGE: {
      STR_PREFIX: "PFL-",
      STR_AUTH: "AuthendicationSuccess",
      STR_AUTHSUCCESS: "isAuthenticated",
      USER: "user",
      ROLE:"Role",
      UNITID:"UnitId",
      SOLUTION_TYPE:"SolutionType",

    },

    RUPEES: {
      symbol: '₹. ',
      symbol2: '₹'
    },
    CURRENCY_FORMAT: "INR",
    DATE: {
      format1: "dd-MM-yyyy",
      apiFormat: "YYYY-MM-DD",  // A valid moment js data format. Refer https://momentjs.com/docs/#/parsing/string-format/
      displayFormat: 'dd/mm/yyyy',
      createdDtApiFormat: 'dd-MM-yyyy HH:mm:ss'
    },
    BsDatePickFormate: {
      dateInputFormat: 'DD.MM.YY',
      containerClass: 'theme-blue',

    },
    POEditBsDatePickFormate: {
      dateInputFormat: 'DD.MM.YY',
      containerClass: 'theme-blue po-edit',
      showWeekNumbers: false
    },
    ANG_DATE: {
      displaydtime: "dd-MMM-yy HH:mm",
      displayFormat: "dd.mm.yy", // 01-31-2019 y-MM-dd
      apiFormat: "yyyy-mm-dd",
    },

    API_URL: {
      LOGIN:{
        LOGIN: "",
        SIDEBAR:"",
        UNITLIST:"",
      }
    },

  },
  NON_SECURE_ROUTERS: ['/login', 'Sales/Approval/PriceChange','/pagenotfound','/404'],
  MENU_HIDE_ROUTERS: ['/login'],
  SIDE_BAR_HIDE: ['Sales/Approval/PriceChange']
});

