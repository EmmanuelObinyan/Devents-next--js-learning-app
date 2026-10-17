import posthog from "posthog-js";

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function requirePostHogConfig(variableName: string, value: string | undefined) {
  if (!value && process.env.NODE_ENV === "development") {
    throw new Error(
      `${variableName} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variableName} is configured`,
    );
  }

  return value;
}

const configuredProjectToken = requirePostHogConfig(
  "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
  projectToken,
);
const configuredHost = requirePostHogConfig("NEXT_PUBLIC_POSTHOG_HOST", host);

if (configuredProjectToken && configuredHost) {
  posthog.init(configuredProjectToken, {
    api_host: configuredHost,
    defaults: "2026-01-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
    logs: {
      serviceName: "events-browser-web",
      environment: process.env.NODE_ENV,
    },
  });
}
