import path from "path";
export { formartError } from "./helpers";
export { default as messageBroker } from "./MessageBroker";
export {
  MESSAGE_BROKER_URL,
  NISHAURI_APPOINTMENT_BINDING_KEY,
  NISHAURI_APPOINTMENT_QUEUE,
  NISHAURI_EXCHANGE_NAME,
  NISHAURI_LOGGING_BINDING_KEY,
  NISHAURI_LOGGING_QUEUE,
  NISHAURI_PATIENT_BINDING_KEY,
  NISHAURI_PATIENT_QUEUE,
} from "./MessageBroker";
export const BASE_DIR = process.cwd();
export const MEDIA_ROOT = path.join(BASE_DIR, "media");
export const MEDIA_URL = "media";
export const PROFILE_URL = "uploads";
