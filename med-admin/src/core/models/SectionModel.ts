export interface SectionModel {
    id: number;
    name: string;
    icon: string;
    employees_count: number;
}

export interface UpdateSectionPayload {
    name: string;
    icon?: string;
}

export interface SectionsApiResponse {
    data: SectionModel[];
    success: boolean;
    code: number;
    message: string;
}

export interface SectionApiResponse {
    data: SectionModel;
    success: boolean;
    code: number;
    message: string;
}