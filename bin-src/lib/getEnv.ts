export interface Env {
  CHROMATIC_INDEX_URL: string;
  CHROMATIC_PROJECT_TOKEN: string;
  CHROMATIC_RETRIES: number;
  CHROMATIC_POLL_INTERVAL: number;
  CHROMATIC_OUTPUT_INTERVAL: number;
  CHROMATIC_TIMEOUT: number;
  CHROMATIC_STORYBOOK_VERSION: string;
  CHROMATIC_DNS_SERVERS: string[];
  CHROMATIC_DNS_FAILOVER_SERVERS: string[];
  ENVIRONMENT_WHITELIST: RegExp[];
  LOGGLY_CUSTOMER_TOKEN: string;
  STORYBOOK_VERIFY_TIMEOUT: number;
  STORYBOOK_BUILD_TIMEOUT: number;
  STORYBOOK_CLI_FLAGS_BY_VERSION: typeof STORYBOOK_CLI_FLAGS_BY_VERSION;
  HTTPS_PROXY: string;
  HTTP_PROXY: string;
}

const {
  CHROMATIC_INDEX_URL = 'https://index.chromatic.com',
  CHROMATIC_RETRIES = '5',
  CHROMATIC_POLL_INTERVAL = String(1000),
  CHROMATIC_OUTPUT_INTERVAL = String(10 * 1000),
  CHROMATIC_TIMEOUT = String(5 * 60 * 1000),
  CHROMATIC_STORYBOOK_VERSION,
  CHROMATIC_DNS_SERVERS = '',
  CHROMATIC_DNS_FAILOVER_SERVERS = '1.1.1.1, 8.8.8.8', // Cloudflare, Google
  LOGGLY_CUSTOMER_TOKEN = 'b5e26204-cdc5-4c78-a9cc-c69eb7fabad3',
  STORYBOOK_VERIFY_TIMEOUT = String(2 * 60 * 1000),
  STORYBOOK_BUILD_TIMEOUT = String(10 * 60 * 1000),
  HTTPS_PROXY = process.env.https_proxy,
  HTTP_PROXY = process.env.http_proxy,
} = process.env;

const ENVIRONMENT_WHITELIST = [/^GERRIT/, /^TRAVIS/];

const STORYBOOK_CLI_FLAGS_BY_VERSION = {
  '--ci': '4.0.0',
  '--loglevel': '5.1.0',
};

const CHROMATIC_PROJECT_TOKEN =
  process.env.CHROMATIC_PROJECT_TOKEN ||
  process.env.CHROMATIC_APP_CODE || // backwards compatibility
  process.env.CHROMA_APP_CODE; // backwards compatibility

export default () =>
  ({
    CHROMATIC_INDEX_URL,
    CHROMATIC_PROJECT_TOKEN,
    CHROMATIC_RETRIES: parseInt(CHROMATIC_RETRIES, 10),
    CHROMATIC_POLL_INTERVAL: parseInt(CHROMATIC_POLL_INTERVAL, 10),
    CHROMATIC_OUTPUT_INTERVAL: parseInt(CHROMATIC_OUTPUT_INTERVAL, 10),
    CHROMATIC_TIMEOUT: parseInt(CHROMATIC_TIMEOUT, 10),
    CHROMATIC_STORYBOOK_VERSION,
    CHROMATIC_DNS_SERVERS: CHROMATIC_DNS_SERVERS.split(',')
      .map((ip) => ip.trim())
      .filter(Boolean),
    CHROMATIC_DNS_FAILOVER_SERVERS: CHROMATIC_DNS_FAILOVER_SERVERS.split(',')
      .map((ip) => ip.trim())
      .filter(Boolean),
    ENVIRONMENT_WHITELIST,
    LOGGLY_CUSTOMER_TOKEN,
    STORYBOOK_VERIFY_TIMEOUT: parseInt(STORYBOOK_VERIFY_TIMEOUT, 10),
    STORYBOOK_BUILD_TIMEOUT: parseInt(STORYBOOK_BUILD_TIMEOUT, 10),
    STORYBOOK_CLI_FLAGS_BY_VERSION,
    HTTPS_PROXY,
    HTTP_PROXY,
  } as Env);
