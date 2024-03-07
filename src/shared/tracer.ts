import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { JaegerExporter, ExporterConfig } from "@opentelemetry/exporter-jaeger";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from "@opentelemetry/sdk-metrics";
import expre, {
  ExpressInstrumentation,
} from "@opentelemetry/instrumentation-express";
import { Resource } from "@opentelemetry/resources";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { configuration } from "../utils";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import opentelemetry from "@opentelemetry/api";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTTracePropagator } from "@opentelemetry/propagator-ot-trace";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";

const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: configuration.name,
  [SEMRESATTRS_SERVICE_VERSION]: configuration.version,
});

export const start = () => {
  console.log("Started tracer -> ", configuration);

  const exporter = new OTLPTraceExporter({
    // url: "http://localhost:16686/api/traces",
    url: `http://localhost:14268/api/traces`,
  });

  // const exporter = new OTLPTraceExporter({
  //   // url: "http://localhost:16686/api/traces",
  //   url: `http://localhost:14268/api/traces`,
  // });

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

  return { tracer: opentelemetry.trace.getTracer(configuration.name) };
};

export const init = () => {
  // User Collector Or Jaeger Exporter
  //const exporter = new CollectorTraceExporter(options)
  console.log("Init tracer -> ", configuration);

  const exporter = new JaegerExporter({
    tags: [],
    // endpoint: `http://localhost:16686/api/traces`,
    endpoint: `http://localhost:14268/api/traces`,
  });

  const provider = new NodeTracerProvider({
    resource,
  });

  //provider.addSpanProcessor(new SimpleSpanProcessor(exporter))

  // Use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources.
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Enable to see the spans printed in the console by the ConsoleSpanExporter
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  provider.register({ propagator: new OTTracePropagator() });

  console.log("tracing initialized");

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });

  const tracer = provider.getTracer(configuration.name);
  return { tracer };
};

export const initConsoled = () => {
  /*instrumentation.ts*/
  // import { NodeSDK } from '@opentelemetry/sdk-node';
  // import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
  // import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
  // import {
  //   PeriodicExportingMetricReader,
  //   ConsoleMetricExporter,
  // } from '@opentelemetry/sdk-metrics';

  const sdk = new NodeSDK({
    traceExporter: new ConsoleSpanExporter(),
    metricReader: new PeriodicExportingMetricReader({
      exporter: new ConsoleMetricExporter(),
    }),
    instrumentations: [getNodeAutoInstrumentations()],
  });
  console.log("------------------Started-------------------");

  sdk.start();
};

initConsoled();
