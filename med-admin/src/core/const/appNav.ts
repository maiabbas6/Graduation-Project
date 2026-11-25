export interface AppNavItem {
    labelKey: string;
    to: string;
    icon: string;
}

export const appNavItems: AppNavItem[] = [
    { labelKey: 'sidebar.home', to: '/', icon: 'home' },
    { labelKey: 'sidebar.appointments', to: '/statistics/appointments', icon: 'calendar' },
    { labelKey: 'sidebar.employees', to: '/employees', icon: 'medical personnel' },
    { labelKey: 'sidebar.topEmployees', to: '/top-employees', icon: 'badge check' },
    { labelKey: 'sidebar.clients', to: '/clients', icon: 'user' },
    { labelKey: 'sidebar.medicalRecords', to: '/medical-records', icon: 'medical file' },
    { labelKey: 'sidebar.medicalPlans', to: '/medical-plans', icon: 'medical clipboard' },
    { labelKey: 'sidebar.sections', to: '/sections', icon: 'hospital sign' },
    { labelKey: 'sidebar.rooms', to: '/rooms', icon: 'hospital building' },
    { labelKey: 'sidebar.roomServices', to: '/room-services', icon: 'medical bag' },
    { labelKey: 'sidebar.roomUsers', to: '/room-users', icon: 'user connection' },
    { labelKey: 'sidebar.roomServiceUsers', to: '/room-service-users', icon: 'user signal' },
    { labelKey: 'sidebar.costs', to: '/costs', icon: 'dollar' },
    { labelKey: 'sidebar.aiAssistant', to: '/ai-assistant', icon: 'artificial intelligence' },
    { labelKey: 'sidebar.systemLogs', to: '/system-logs', icon: 'check clipboard' },
    { labelKey: 'sidebar.notifications', to: '/notifications', icon: 'bell' },
];
