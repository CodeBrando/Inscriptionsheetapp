import { Assignment } from "./assignment";

export interface Career {
    id: string;
    name: string;
    careerCode: string;
    assignments: Assignment[];
}