export interface IPageCreation {
    pageId?: number | null | undefined;
    pageName?: string | null | undefined;
    // uniqueName?: string | null | undefined;
    pageURL?: string | null | undefined;

    mainPageId?: number | null | undefined;
    mainPageName?: any | null | undefined;

    applicationId?: number | null | undefined;
    application?: any | null | undefined;

    moduleId?: number | null | undefined;
    moduleName?: any | null | undefined;

    // subModuleId?: number | null | undefined;
    // subModuleName?: any | null | undefined;

    orderBy?: string | null | undefined;
    iconStyle?: string | null | undefined;
    isMenu?: any | null | undefined,
}

