import type {
  BaseEventOrResult,
  DefaultOverrideOptions,
  ExternalMiddlewareConfig,
  InternalEvent,
  InternalResult,
  OpenNextConfig,
  OverrideOptions,
} from "types/open-next";
import type { Converter, TagCache, Wrapper } from "types/overrides";

// Just a little utility type to remove undefined from a type
type RemoveUndefined<T> = T extends undefined ? never : T;

export async function resolveConverter<
  E extends BaseEventOrResult = InternalEvent,
  R extends BaseEventOrResult = InternalResult,
>(
  converter: DefaultOverrideOptions<E, R>["converter"],
): Promise<Converter<E, R>> {
  if (typeof converter === "function") {
    return converter();
  }
  const m_1 = await import("../overrides/converters/aws-apigw-v2.js");
  // @ts-expect-error
  return m_1.default;
}

export async function resolveWrapper<
  E extends BaseEventOrResult = InternalEvent,
  R extends BaseEventOrResult = InternalResult,
>(wrapper: DefaultOverrideOptions<E, R>["wrapper"]): Promise<Wrapper<E, R>> {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  // This will be replaced by the bundler
  const m_1 = await import("../overrides/wrappers/aws-lambda.js");
  // @ts-expect-error
  return m_1.default;
}

/**
 *
 * @param tagCache
 * @returns
 * @__PURE__
 */
export async function resolveTagCache(
  tagCache: OverrideOptions["tagCache"],
): Promise<TagCache> {
  if (typeof tagCache === "function") {
    return tagCache();
  }
  // This will be replaced by the bundler
  const m_1 = await import("../overrides/tagCache/dynamodb.js");
  return m_1.default;
}

/**
 *
 * @param queue
 * @returns
 * @__PURE__
 */
export async function resolveQueue(queue: OverrideOptions["queue"]) {
  if (typeof queue === "function") {
    return queue();
  }
  const m_1 = await import("../overrides/queue/sqs.js");
  return m_1.default;
}

/**
 *
 * @param incrementalCache
 * @returns
 * @__PURE__
 */
export async function resolveIncrementalCache(
  incrementalCache: OverrideOptions["incrementalCache"],
) {
  if (typeof incrementalCache === "function") {
    return incrementalCache();
  }
  const m_1 = await import("../overrides/incrementalCache/s3.js");
  return m_1.default;
}

/**
 * @param imageLoader
 * @returns
 * @__PURE__
 */
export async function resolveImageLoader(
  imageLoader: RemoveUndefined<OpenNextConfig["imageOptimization"]>["loader"],
) {
  if (typeof imageLoader === "function") {
    return imageLoader();
  }
  const m_1 = await import("../overrides/imageLoader/s3.js");
  return m_1.default;
}

/**
 * @returns
 * @__PURE__
 */
export async function resolveOriginResolver(
  originResolver: RemoveUndefined<ExternalMiddlewareConfig>["originResolver"],
) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await import("../overrides/originResolver/pattern-env.js");
  return m_1.default;
}

/**
 * @returns
 * @__PURE__
 */
export async function resolveAssetResolver(
  assetResolver: RemoveUndefined<OpenNextConfig["middleware"]>["assetResolver"],
) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await import("../overrides/assetResolver/dummy.js");
  return m_1.default;
}

/**
 * @__PURE__
 */
export async function resolveWarmerInvoke(
  warmer: RemoveUndefined<OpenNextConfig["warmer"]>["invokeFunction"],
) {
  if (typeof warmer === "function") {
    return warmer();
  }
  const m_1 = await import("../overrides/warmer/aws-lambda.js");
  return m_1.default;
}

/**
 * @__PURE__
 */
export async function resolveProxyRequest(
  proxyRequest: OverrideOptions["proxyExternalRequest"],
) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await import("../overrides/proxyExternalRequest/node.js");
  return m_1.default;
}

/**
 * @__PURE__
 */
export async function resolveCdnInvalidation(
  cdnInvalidation: OverrideOptions["cdnInvalidation"],
) {
  if (typeof cdnInvalidation === "function") {
    return cdnInvalidation();
  }
  const m_1 = await import("../overrides/cdnInvalidation/dummy.js");
  return m_1.default;
}
