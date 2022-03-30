import { Task } from "app/domain/todo/services/tasks/task.service.models";

export interface Project {
    name: string;
    goal: string;
    endDate: string;
    icon: string;
    color: string;
    id: number
    projects: subProjects[];
}

export interface subProjects {
    name: string;
    id: number;
    tasks: Array<Task>;
}

export interface CreateProject {
    name: string;
    goal: string;
    endDate: string;
    icon: string;
    color: string;
}