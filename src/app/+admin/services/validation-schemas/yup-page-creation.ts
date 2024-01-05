import * as yup from "yup";

export const YupAdminValidation = Object.freeze({

  APPLICATION_CREATION: yup.object().shape({
    applicationId: yup.number().nullable(),
    applicationName: yup.string().required('Application Name is required'),
    description: yup.string().nullable()
  }),

  MODULE_CREATION: yup.object().shape({
    moduleId: yup.number().notRequired(),
    applicationId: yup.number().notRequired(),
    application: yup.object().required('Application Name is required'),
    moduleName: yup.string().required('Module Name is required'),
    description: yup.string().nullable(),

    isActive: yup.bool().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable(),
  }),

  PAGE_CREATION: yup.object().shape({
    ApplicationName: yup.object().required('Application Name is required'),
    ModuleName: yup.object().required('Module Name is required'),
    SubModuleName: yup.object().nullable(),

    PageName: yup.string().required('Page Name is required'),
    PageURL: yup.string().nullable(),
    MainPageName: yup.string().nullable(),

    OrderBy: yup.string().required().min(1),
    IconStyle: yup.string().required().min(1),
    selectedCategory: yup.boolean().required()
  }),

  ROLE_CREATION: yup.object().shape({
    roleId: yup.number().notRequired(),
    applicationId: yup.number().notRequired(),
    application: yup.object().required('Application Name is required'),
    roleName: yup.string().required('Module Name is required'),
    description: yup.string().nullable(),

    isActive: yup.bool().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable(),
  }),

  ROLE_PAGE_ASSOCIATE: yup.object().shape({
    ApplicationName: yup.object().required('Application Name is required'),
    RoleName: yup.object().required('Role Name is required'),
  }),

  USER_CREATION: yup.object().shape({
    ApplicationName: yup.object().required('Application Name is required'),
    RoleName: yup.object().required('Role Name is required'),
  }),

});