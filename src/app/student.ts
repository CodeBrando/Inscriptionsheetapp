import { Career } from "./career";

export interface Student{
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    studentStatus: string;
    studentCode: string;
    career: Career;
}