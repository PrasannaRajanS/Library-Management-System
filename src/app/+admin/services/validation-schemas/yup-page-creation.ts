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

    pageId: yup.number().notRequired(),
    pageName: yup.string().required('Page Name is required'),
    pageURL: yup.string().nullable(),
    mainPageId: yup.number().nullable().notRequired(),
    mainPageName: yup.object().nullable(),

    // uniqueName: yup.string().nullable(),
    
    applicationId: yup.number().nullable().notRequired(),
    application: yup.object().required('Application Name is required'),

    moduleId: yup.number().nullable().notRequired(),
    moduleName: yup.object().required('Module Name is required'),
    // subModuleId: yup.number().notRequired(),
    // subModuleName: yup.object().nullable(),

    orderBy: yup.string().nullable().notRequired(),
    iconStyle: yup.string().required('Icon / Font Style is required'),
    isMenu: yup.object().nullable().notRequired()
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
    rolePageAssocId: yup.number().notRequired(),
    
    applicationId: yup.number().notRequired(),
    application: yup.object().required('Application Name is required'),

    roleId: yup.number().notRequired(),
    role: yup.object().required('Role Name is required'),
    pageId: yup.number().notRequired(),

    isActive: yup.bool().nullable(),
    userId: yup.number().nullable(),
    ipAddress: yup.string().nullable(),
  }),

  USER_CREATION: yup.object().shape({
    userId: yup.number().nullable().notRequired(),

    userName: yup.string().required('User Name is required'),
    employeeId: yup.number().nullable().notRequired(),
    employeeName: yup.string().nullable().notRequired(),
    employee: yup.object().required('Employee is required'),
    password: yup.string().required('Password is required'),
    description: yup.string().nullable().notRequired(),
    
    pageId: yup.number().notRequired(),
    pageName: yup.string().nullable().notRequired(),
    page: yup.object().required('Default Page is required'),

    applicationId: yup.number().nullable().notRequired(),
    applicationName: yup.string().nullable().notRequired(),
    application: yup.object().required('Application is required'),

    roleId: yup.number().nullable().notRequired(),
    roleName: yup.string().nullable().notRequired(),
    role: yup.object().required('Role is required'),

    email: yup.string().required('Email is required'),
    phoneNumber: yup.string().required('Phone Number is required'),

    isActive: yup.bool().nullable().notRequired(),
    loggedinUserId: yup.number().nullable().notRequired(),
    ipAddress: yup.string().nullable().notRequired(),
    selectedUnits: yup.array().required('Unit is required'),
  }),

});