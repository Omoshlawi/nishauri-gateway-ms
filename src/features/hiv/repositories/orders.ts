import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { ARTDrugOrder } from "../entities";

export class ARTDrugOrderRepository implements Repository<ARTDrugOrder> {
  create(entity: any, token?: string): Promise<ARTDrugOrder> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders`,
      method: "POST",
      data: entity,
      headers: { "x-access-token": token },
    });
  }
  findOneById(id: string, token?: string): Promise<ARTDrugOrder | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  findAll(token?: string): Promise<ARTDrugOrder[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    token?: string
  ): Promise<ARTDrugOrder[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders`,
      method: "GET",
      params: criteria,
      headers: { "x-access-token": token },
    });
  }
  updateById(
    id: string,
    updates: Partial<ARTDrugOrder>,
    token?: string
  ): Promise<ARTDrugOrder | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "PUT",
      data: updates,
      headers: { "x-access-token": token },
    });
  }
  deleteById(id: string, token?: string): Promise<void> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/${id}`,
      method: "DELETE",
      headers: { "x-access-token": token },
    });
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
