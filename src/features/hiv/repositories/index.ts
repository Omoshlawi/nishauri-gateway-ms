import { AppointmentRepository } from "./appointments";
import { ARTDrugOrderRepository } from "./orders";
import { TreatentSupportRepository } from "./treatmentSupport";
export const treatmentSurportRepo = new TreatentSupportRepository();
export const appointmentRepo = new AppointmentRepository();
export const ordersRepo = new ARTDrugOrderRepository();
