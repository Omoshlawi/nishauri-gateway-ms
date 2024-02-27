import ServiceClient from "../../../shared/ServiceClient";
import { Repository } from "../../../shared/types";
import { ARTGroup, ARTGroupUserEnrollment } from "../entities";

export class ARTGrupRepository implements Repository<ARTGroup> {
  create(entity: ARTGroup, token?: string): Promise<ARTGroup> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "POST",
      url: `art-community/groups`,
      data: entity,
      headers: { "x-access-token": token },
    });
  }
  findOneById(id: string, token?: string): Promise<ARTGroup | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/groups/${id}`,
      headers: { "x-access-token": token },
    });
  }
  findAll(token?: string): Promise<ARTGroup[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/groups`,
      headers: { "x-access-token": token },
    });
  }

  findUseGroupEnrollments(token?: string): Promise<ARTGroupUserEnrollment[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/enrollments`,
      headers: { "x-access-token": token },
    });
  }
  findByCriteria(
    criteria: Record<string, any>,
    token?: string
  ): Promise<ARTGroup[]> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "GET",
      url: `art-community/groups`,
      params: criteria,
      headers: { "x-access-token": token },
    });
  }
  updateById(
    id: string,
    updates: Partial<ARTGroup>,
    token?: string
  ): Promise<ARTGroup | undefined> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "PUT",
      url: `art-community/groups/${id}`,
      data: updates,
      headers: { "x-access-token": token },
    });
  }
  deleteById(id: string, token?: string): Promise<void> {
    return ServiceClient.callService("nishauri-hiv-service", {
      method: "DELETE",
      url: `art-community/groups/${id}`,
      headers: { "x-access-token": token },
    });
  }
  exists(criteria: Record<string, any>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
