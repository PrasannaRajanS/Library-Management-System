import * as yup from "yup";
export const YupPageCreation = Object.freeze({
    PAGECREATION_INFO :yup.object().shape({
      ApplicationName: yup.string().required(),
      ModuleName:yup.string().required(),
      SubModuleName:yup.string().required(),
      PageName:yup.string().required(),  
      PageURL:yup.string().required(),
      MainPageName:yup.string().required(),    
      OrderBy:yup.string().required().min(1), 
      IconStyle:yup.string().required().min(1), 
      IsSubMenu1:yup.boolean().required(),
      IsSubMenu2:yup.boolean().required(),   
      }),
     
});