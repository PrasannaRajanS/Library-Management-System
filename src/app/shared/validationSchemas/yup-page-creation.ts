import * as yup from "yup";
export const YupPageCreation = Object.freeze({
    COMPANY_INFO :yup.object().shape({
        companyName: yup.string().required().min(2),            
      }),
     
});