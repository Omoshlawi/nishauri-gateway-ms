import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { TreatmentSupport } from "../entities";

export class TreatentSupportRepository implements Repository<TreatmentSupport> {
  create(entity: TreatmentSupport): Promise<TreatmentSupport>;
  create(entity: Record<string, any>): Promise<TreatmentSupport>;
  create(entity: unknown): Promise<TreatmentSupport> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<TreatmentSupport | undefined> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<TreatmentSupport[]> {
    return await ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-treatment-support`,
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<TreatmentSupport[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<TreatmentSupport>
  ): Promise<TreatmentSupport | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

export const treatmentSurportRepo = new TreatentSupportRepository();
