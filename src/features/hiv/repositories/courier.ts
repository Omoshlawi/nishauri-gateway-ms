import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { Courier } from "../entities";

export class CourierRepository implements Repository<Courier> {
  create(entity: Courier): Promise<Courier> {
    throw new Error("Method not implemented.");
  }
  findOneById(id: string): Promise<Courier | undefined> {
    throw new Error("Method not implemented.");
  }
  findAll(token?:string): Promise<Courier[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      url: `orders/courier-services`,
      method: "GET",
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(criteria: Record<string, any>): Promise<Courier[]> {
    throw new Error("Method not implemented.");
  }
  updateById(
    id: string,
    updates: Partial<Courier>
  ): Promise<Courier | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
