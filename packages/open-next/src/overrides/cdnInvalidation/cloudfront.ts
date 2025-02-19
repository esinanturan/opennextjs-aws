import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import type { CDNInvalidationHandler } from "types/overrides";

const cloudfront = new CloudFrontClient({});
export default {
  name: "cloudfront",
  invalidatePaths: async (paths) => {
    const constructedPaths = paths.flatMap(
      ({ initialPath, resolvedRoutes }) => {
        const isAppRouter = resolvedRoutes.some(
          (route) => route.type === "app",
        );
        // revalidateTag doesn't have any leading slash, remove it just to be sure
        const path = initialPath.replace(/^\//, "");
        return isAppRouter
          ? [`/${path}`, `/${path}?_rsc=*`]
          : [
              `/${path}`,
              `/_next/data/${process.env.NEXT_BUILD_ID}${path === "/" ? "/index" : `/${path}`}.json*`,
            ];
      },
    );
    await cloudfront.send(
      new CreateInvalidationCommand({
        DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID!,
        InvalidationBatch: {
          // Do we need to limit the number of paths? Or batch them into multiple commands?
          Paths: { Quantity: constructedPaths.length, Items: constructedPaths },
          CallerReference: `${Date.now()}`,
        },
      }),
    );
  },
} satisfies CDNInvalidationHandler;
