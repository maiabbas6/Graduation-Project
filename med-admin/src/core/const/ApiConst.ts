export class ApiConst {
    private static readonly base = 'https://temp.alanoudtours.cloud/api';
    // private static readonly base = 'http://localhost:8000/api';

    static readonly login = `${this.base}/auth/login`;
    static readonly profile = `${this.base}/auth/profile`;
    static readonly statistics = `${this.base}/statistics`;
    static readonly statisticsEmployees = `${this.base}/statistics/employees`;
    static readonly statisticsClients = `${this.base}/statistics/clients`;
    static readonly statisticsAppointments = `${this.base}/statistics/appointments`;
    static readonly appointments = `${this.base}/statistics/appointments`;
    static readonly sections = `${this.base}/sections`;
    static readonly employees = `${this.base}/employees`;
    static readonly rooms = `${this.base}/rooms`;
    static readonly roomServices = `${this.base}/room-services`;
    static readonly roomUsers = `${this.base}/room-users`;
    static readonly roomServiceUsers = `${this.base}/room-service-users`;
    static readonly costs = `${this.base}/costs`;
    static readonly user = `${this.base}/user`;
    static readonly attendances = `${this.base}/attendances`;
    static readonly schedules = `${this.base}/schedules`;
    static readonly aiChats = `${this.base}/ai_chat`;
    static readonly newAiChat = `${this.base}/new-chat`;
    static readonly systemLogs = `${this.base}/system-logs`;
    static readonly notifications = `${this.base}/notifications`;
    static readonly medicalRecords = `${this.base}/medical-records`;
    static readonly medicalPlans = `${this.base}/medical-plans`;
    static readonly topEmployees = `${this.base}/statistics/top-employees`;
    static readonly statisticsExportPdf = `${this.base}/statistics/export-pdf`;

    static userMedicalReportPdf(userId: number): string {
        return `${this.base}/users/${userId}/medical-report/pdf`;
    }

    static employeeById(id: number): string {
        return `${this.employees}/${id}`;
    }

    static employeeAttendances(id: number): string {
        return `${this.employeeById(id)}/attendances`;
    }

    static employeeAttendanceScheduleDiff(id: number): string {
        return `${this.employeeById(id)}/attendance-schedule-diff`;
    }

    static appointmentById(id: number): string {
        return `${this.base}/appointments/${id}`;
    }

    static roomById(id: number): string {
        return `${this.rooms}/${id}`;
    }

    static roomServiceById(id: number): string {
        return `${this.roomServices}/${id}`;
    }

    static roomUserById(id: number): string {
        return `${this.roomUsers}/${id}`;
    }

    static roomServiceUserById(id: number): string {
        return `${this.roomServiceUsers}/${id}`;
    }

    static costById(id: number): string {
        return `${this.costs}/${id}`;
    }

    static costPay(id: number): string {
        return `${this.costs}/${id}/pay`;
    }

    static costUnpay(id: number): string {
        return `${this.costs}/${id}/unpay`;
    }

    static costExportPdf(id: number): string {
        return `${this.costs}/${id}/export-pdf`;
    }

    static roomServiceUserStatusById(id: number): string {
        return `${this.roomServiceUserById(id)}/status`;
    }

    static sectionById(id: number): string {
        return `${this.sections}/${id}`;
    }

    static userById(id: number): string {
        return `${this.user}/${id}`;
    }

    static aiChatById(id: number): string {
        return `${this.aiChats}/${id}`;
    }

    static aiChatMessage(id: number): string {
        return `${this.base}/message-chat/${id}`;
    }

    static systemLogById(id: number): string {
        return `${this.systemLogs}/${id}`;
    }

    static medicalRecordById(id: number): string {
        return `${this.medicalRecords}/${id}`;
    }

    static medicalPlanById(id: number): string {
        return `${this.medicalPlans}/${id}`;
    }

    static baseUrl(path: string): string {
        if (!path) return path;
        if (/^https?:\/\//.test(path)) return path;
        return `${this.base.replace(/\/api$/, '')}/${path.replace(/^\/+/, '')}`;
    }
}
