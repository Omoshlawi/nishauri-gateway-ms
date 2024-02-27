import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { ARTEvent } from "../entities";

export class ARTEventsRepsitory implements Repository<ARTEvent> {
  create(entity: ARTEvent, token?: string): Promise<ARTEvent> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "POST",
      url: `art-community/events`,
      headers: { "x-access-token": token },
      data: entity,
    });
  }
  findOneById(id: string, token?: string): Promise<ARTEvent | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/events/${id}`,
      headers: { "x-access-token": token },
    });
  }
  findAll(token?: string): Promise<ARTEvent[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/events`,
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    token?: string
  ): Promise<ARTEvent[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/events`,
      params: criteria,
      headers: { "x-access-token": token },
    });
  }
  updateById(
    id: string,
    updates: Partial<ARTEvent>,
    token?: string
  ): Promise<ARTEvent | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "PUT",
      url: `art-community/events/${id}`,
      data: updates,
      headers: { "x-access-token": token },
    });
  }
  deleteById(id: string, token?: string): Promise<void> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "DELETE",
      url: `art-community/events/${id}`,
      headers: { "x-access-token": token },
    });
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
