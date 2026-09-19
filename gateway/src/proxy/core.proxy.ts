import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "../config/env.js";

/**
 * Proxies all /api/core/* requests to the Core Service.
 *
 * Path rewrite: /api/core → "" (stripped)
 * So: GET /api/core/api/v1/profiles → Core Service GET /api/v1/profiles
 */
export const coreProxy = createProxyMiddleware({
  target: env.services.core,
  changeOrigin: true,
  pathRewrite: {
    "^/api/core": "",
  },
});
