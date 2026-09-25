export const config = { runtime: 'edge', regions: ['iad1', 'lhr1', 'fra1', 'sfo1'] };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
// @ts-expect-error JS module without types
import { withNameScrub } from '../../lodestar/_scrub-response.js';
import { createIntelligenceServiceRoutes } from '../../../src/generated/server/worldmonitor/intelligence/v1/service_server';
import { intelligenceHandler } from '../../../server/worldmonitor/intelligence/v1/handler';

export default withNameScrub(createDomainGateway(
  createIntelligenceServiceRoutes(intelligenceHandler, serverOptions),
));
