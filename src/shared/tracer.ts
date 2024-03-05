import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { JaegerExporter, ExporterConfig } from "@opentelemetry/exporter-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  NodeTracerProvider,
} from "@opentelemetry/sdk-trace-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";
import expre from "@opentelemetry/instrumentation-express";
import { Resource } from "@opentelemetry/resources";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { configuration } from "../utils";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import opentelemetry from "@opentelemetry/api";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: configuration.name,
  [SEMRESATTRS_SERVICE_VERSION]: configuration.version,
});

const exporter = new OTLPTraceExporter();
// { url: "http://localhost:16686/api/traces"}

const tracerProvider = new NodeTracerProvider({ resource });
tracerProvider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    // The maximum queue size. After the size is reached spans are dropped.
    maxQueueSize: 1000,
    // The interval between two consecutive exports
    scheduledDelayMillis: 30000,
  })
);

tracerProvider.register();

registerInstrumentations({
  instrumentations: getNodeAutoInstrumentations({
    "@opentelemetry/instrumentation-fs": { enabled: false },
    "@opentelemetry/instrumentation-express": { enabled: true },
    "@opentelemetry/instrumentation-http": { enabled: true },
    "@opentelemetry/instrumentation-amqplib": { enabled: true },
    "@opentelemetry/instrumentation-pg": { enabled: true },
  }),
});

console.log(
  "----------------------------------------------------------------------------------------------------"
);

export default opentelemetry.trace.getTracer(configuration.name);
