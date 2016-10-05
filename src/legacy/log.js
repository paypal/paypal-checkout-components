
import { LOG_PREFIX } from './constants';
import logger from 'beaver-logger/client';

export let $logger = logger.prefix(LOG_PREFIX);
