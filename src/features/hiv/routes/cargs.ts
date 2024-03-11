import { Router } from "express";
import {
  createEvents,
  createGroups,
  getEvents,
  getGroups,
  getMyGroupEnrollments,
  updateEvent,
  updateGroup,
} from "../controlers";

const router = Router();
router.get("/groups", getGroups);
router.get("/enrollments", getMyGroupEnrollments);
router.post("/groups", createGroups);
router.put("/groups/:id", updateGroup);
router.put("/events/:id", updateEvent);

router.get("/events", getEvents);
router.post("/events", createEvents);
export default router;
