import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Appointment } from "../entities";

export class AppointmentRepository implements Repository<Appointment> {
  create(entity: Appointment): Promise<Appointment>;
  create(entity: Record<string, any>): Promise<Appointment>;
  create(entity: unknown): Promise<Appointment> {
    throw new Error("Method not implemented.");
  }
  async findOneById(id: string): Promise<Appointment | undefined> {
    return await ServiceClient.callService("nishauri-hiv-service", {
      url: `appointments/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<Appointment[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `appointments`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Appointment[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Appointment>
  ): Promise<Appointment | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
