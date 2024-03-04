// import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
// import { JaegerExporter, ExporterConfig } from "@opentelemetry/exporter-jaeger";
// import { NodeSDK,  } from '@opentelemetry/sdk-node';
// import { ConsoleSpanExporter, NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
// import {
//     PeriodicExportingMetricReader,
//     ConsoleMetricExporter,

//   } from '@opentelemetry/sdk-metrics';
//   import expre from "@opentelemetry/instrumentation-express"
// import { Resource } from "@opentelemetry/resources";
// import {
//   SEMRESATTRS_SERVICE_NAME,
//   SEMRESATTRS_SERVICE_VERSION,
// } from "@opentelemetry/semantic-conventions";
// import { configuration } from "../utils";

// const resource = new Resource({
//   [SEMRESATTRS_SERVICE_NAME]: configuration.name,
//   [SEMRESATTRS_SERVICE_VERSION]: configuration.version
// });

// const exporter = new JaegerExporter({
//   endpoint: "http://localhost:16686/api/traces", // Assuming Jaeger runs on localhost port 16686
// });

// // const tracerProvider = new OTLPTraceExporter({
// //   exporter,
// //   resource,
// // });
// // getNodeAutoInstrumentations().enable({
// //   "@opentelemetry/instrumentation-express": true,
// // });


// tracerProvider.start();

// export { tracerProvider };
