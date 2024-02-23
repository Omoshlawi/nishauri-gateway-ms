import { Entity } from "../../../shared/types";

export interface Appointment extends Entity {
  id: string;
  cccNumber: string;
  appointmentType: "Re-Fill" | "Clinical Review" | "PCR" | "Lab Investigation";
  appointmentDate: string;
  dateAttended: string;
  nextAppointmentDate: string;
}

export interface Courier extends Entity {
  name: string;
}

export interface TreatmentSupport extends Entity {
  careReceiver: string;
  careGiver: string;
}

export interface ARTEventFeedback extends Entity {
  confirmedAttendance: boolean;
  requestedHomeDelivery: boolean;
  note?: string;
}

export interface ARTGroupUserEnrollment extends Entity {
  isAdmin: boolean;
  isCurrent: boolean;
  publicName?: string;
  user: Record<string, any>; // TODO Replace with actual user schema
}

export interface ARTGroupExtraSubscriber extends Entity {
  cccNumber: string;
  phoneNumber: string;
  name: string;
}

export interface ARTGroup extends Entity {
  title: string;
  description?: string;
  enrollments: ARTGroupUserEnrollment[];
  extraSubscribers: ARTGroupExtraSubscriber[];
}

export interface Address extends Entity {
  latitude: number;
  longitude: number;
  address: string;
}

export interface ARTEvent extends Entity {
  title: string;
  remarks?: string;
  distributionTime: string;
  distributionVenue: string;
  remiderNortificationDates: string[];
  feedBacks: ARTEventFeedback[];
  group: ARTGroup;
}

export interface DeliveryPerson {
  fullName: string;
  nationalId: number;
  phoneNumber: string;
  pickUpTime: string;
}

export interface ARTDrugOrderDelivery extends Entity {
  courierService?: Courier;
  deliveryAddress?: Address;
  deliveryPerson: DeliveryPerson;
  initiatedBy: Record<string, any>; // TODO replace with actual schema
  method: "self" | "courier" | "patient_preference";
  patient: Record<string, any>; // TODO replace with actual schema
  services: string[];
}

export interface ARTDrugOrder extends Entity {
  appointment?: Appointment;
  courierService?: Courier;
  type: "self" | "other";
  event?: ARTEvent;
  deliveryAddress: Address;
  deliveryMethod: "in_parcel" | "in_person";
  deliveryPerson?: DeliveryPerson;
  orderedBy: Record<string, any>; // TODO replace with actual schema
  patient: Record<string, any>; // TODO replace with actual schema
  phoneNumber: string;
  deliveries: ARTDrugOrderDelivery[];
}
