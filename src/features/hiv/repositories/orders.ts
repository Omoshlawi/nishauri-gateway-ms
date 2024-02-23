import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { ARTDrugOrder } from "../entities";

export class ARTDrugOrderRepository implements Repository<ARTDrugOrder> {
  create(entity: ARTDrugOrder): Promise<ARTDrugOrder>;
  create(entity: Record<string, any>): Promise<ARTDrugOrder>;
  create(entity: unknown): Promise<ARTDrugOrder> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<ARTDrugOrder | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "GET",
    });
  }
  findAll(): Promise<ARTDrugOrder[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders`,
      method: "GET",
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<ARTDrugOrder[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders`,
      method: "GET",
      params: criteria,
    });
  }
  updateById(
    id: string,
    updates: Partial<ARTDrugOrder>
  ): Promise<ARTDrugOrder | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "PUT",
      data: updates,
    });
  }
  deleteById(id: string): Promise<void> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "DELETE",
    });
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
