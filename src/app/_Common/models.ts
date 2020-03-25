export enum WidgetNames {
    CreateNew = 1,
    Alerts,
    Operations,
    KestraNews,
    MyBusiness,
    Compensation,
    Reports,
    Favorites,
    KestraSocial,
}

export interface IWidgetData {
    id: number;
    name: string;
    headerMenu: boolean;
    title: string;
    isCollapsed: boolean;
    isRemovable: boolean;
    hasInfo: boolean;
    infoText: null;
    displayOrder: number;
    autoRefresh: boolean;
    headerCSS: string;
    showFooter: boolean;
    showFooterBorder: boolean;
    showRemoveButton?: boolean;
    componentType?: string;
    config?: any[];
}

export interface IOpeartionsChartData {
    chartName: string;
    chartData: ChartDatum[];
}

export interface ChartDatum {
    id: number;
    text: string;
    count: number;
    selected: boolean;
}


export interface IReportsData {
    displayName: string;
    url: string;
}

export interface IAppUser {
    impersonatedUser?: IAppUser;
    clientID: number;
    memberType: number;
    clientNumber: number;
    crdNumber: number;
    email: string;
    entityID: number;
    firstName: string;
    lastName: string;
    fullName: string;
    userName: string;
    isInternalUser: boolean;
}


export interface Alert {
    alertId: number;
    timeOccurred: string;
    text: string;
    eventUrl: string;
    isRead: boolean;

}

export interface IAlertData {
    unreadAlerts: number;
    alerts: Alert[];
}


export interface Announcement {
    alertId: number;
    departmentName: string;
    title: string;
    url: string;
    publishedDate: any;

}

export interface IAnnouncementData {
    announcements: Announcement[];
    trainingEventsCount: number;
}

export interface TrainingEvent {
    eventId: number;
    eventUrl: string;
    title: string;
}

export interface ITrainingEventData {
    //trainingEvents: TrainingEvent[]
   trainingEventsCount: number;
}

export interface IFavoritesData {
    menuItem: string;
    url: string;
}

export interface ICompensationData {
    nextPayDate: string;
    lastPayDate: string;
    currentStatementUrl: string;
    charts: Chart[];
}

export interface IMyBusinessData {
    lastUsedWidgetName: string;
    lastUserWidgetDisplayName: string;
    lastDashboardUserDisplayName: string;
    selectedMeasure: string;
    lastDashboardIsRep: boolean;
    period: IMyBusinessPeriodDataItem;
    data: Chart[];
    grandTotal?: number;
}

export interface Chart {
    id: number;
    measureName: string;
    measureDisplayName: string;
    columnName: string;
    selected?: boolean;
    url?: string;
    total?: number;
    dataSet?: Array<{ data: number[], label: string, lineTension: number }>
    dataArray?: number[];
    labels?: string[];
    data: Datum[];
}

export interface Datum {
    id: number;
    name: string;
    value: number;
    target?: number;
    css: any;
}


export interface IMyBusinessPeriodData {
    months: IMyBusinessPeriodDataItem[];
    payCycles?: IMyBusinessPeriodDataItem[];
    quarters: IMyBusinessPeriodDataItem[];
    years: IMyBusinessPeriodDataItem[];
}

export interface IMyBusinessPeriodDataItem {
    displayName: string;
    periodType: number;
    queryValue: string;
    value: string;
    yearToDate: boolean;
}

export interface IMyBusinessMeasure {
    list: Array<{ value: number, text: string }>,
    mesaureByValue: Object,
    mesaureByText: Object
}

export interface IMyBusinessTargetSaveModel {
    targets: Array<{ productType: string, targetValue: number; }>;
}

export interface IMyBusinessUpdateTargetsPostModel {
    request: IMyBusinessTargetSaveModel;
    period: IMyBusinessPeriodDataItem;
    measure: number;
    entityType: number;
}

//--------------------------------------------------------------------------------
//---------------------------Navigation Models------------------------------------
//--------------------------------------------------------------------------------
// **** Options definitions for render method.
interface AppNavigationCustomNavItem {
    name: string;
    onclick?: (this: HTMLAnchorElement, evt: MouseEvent) => any;
    url?: string;
    target?: string;
    position?: number;
}

interface AppNavigationCustomNavItems {
    newsAlerts?: AppNavigationCustomNavItem[];
    profile?: AppNavigationCustomNavItem[];
    admin?: AppNavigationCustomNavItem[];
}

export interface AppNavigationOptions {
    // Specifies the environment that defines the menu API domain for service calls. This property can be interpreted in multiple ways:
    //  - If no value is specified, the environment will be determined from the URL that contains the script.  If it can't be determined, the script will default to production domain.
    //  - If the value is specified, it will only recognize "dev", "qac", "qaf", "qan", "demo" or "" (empty string, meaning prod).  It will also try to convert from "development", "prod" or "production".
    environment?: string;
    // Specifies the menu application to retrieve items for. Leave undefined to let the MenuAPI use its pre-defined application id.
    menuApplicationId?: number;
    // Specifies whether the service should fall back to using the old MenuItem structure in the case that there aren't any entries in NavItems for the specified application. (Default: false)
    useMenuItemFallback?: boolean;
    // Specifies whether the body style should be copied to the .an_body element we create for the page. (Default: true)
    copyBodyStyle?: boolean;
    // Callback for after the loading screen is shown but before the page content is moved around.
    onInitialized?: () => void;
    // Promise indicating the consuming page is fully loaded and ready to display. The return result isn't used but is declared as any for simplicity's sake.
    pageLoaded?: PromiseLike<any>;
    // Custom nav items that individual apps can provide to add their own entries into the designated sections of the menu.
    customNavItems?: AppNavigationCustomNavItems;
}

// **** Definitions for onNavToggling and onNavToggled callbacks
interface NavTogglingEventDetail {
    isCollapsing: boolean;
}

interface NavTogglingEvent extends CustomEvent {
    detail: NavTogglingEventDetail;
}

type NavTogglingEventHandler = (this: HTMLDivElement, e: NavTogglingEvent) => void;

interface NavToggledEventDetail {
    collapsed: boolean;
}

interface NavToggledEvent extends CustomEvent {
    detail: NavToggledEventDetail;
}

type NavToggledEventHandler = (this: HTMLDivElement, e: NavToggledEvent) => void;

// **** Main import declaration
export interface AppNavigation {
    // Main entry point
    render(userOptions?: AppNavigationOptions): void;
    refreshAlertsCount(): void;
    // These events are triggered when the user expands or collapses the left nav.
    onNavToggling(listener: NavTogglingEventHandler): void;
    onNavToggled(listener: NavToggledEventHandler): void;
}

//---------------------------------------------------------------------------------------
//---------------------------End of Navigation Models------------------------------------
//---------------------------------------------------------------------------------------