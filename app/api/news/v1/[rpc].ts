export const config = { runtime: 'edge', regions: ['iad1', 'lhr1', 'fra1', 'sfo1'] };

import { createDomainGateway, serverOptions } from '../../../server/gateway';
// @ts-expect-error JS module without types
import { withNameScrub } from '../../lodestar/_scrub-response.js';
import { createNewsServiceRoutes } from '../../../src/generated/server/worldmonitor/news/v1/service_server';
import { newsHandler } from '../../../server/worldmonitor/news/v1/handler';

export default withNameScrub(createDomainGateway(
  createNewsServiceRoutes(newsHandler, serverOptions),
));
