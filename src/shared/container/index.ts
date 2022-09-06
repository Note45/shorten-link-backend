import { container } from 'tsyringe';

import { UrlRepository } from '../../modules/url/infra/typeorm/repositories/UrlRepository';
import { IUrlRepository } from '../../modules/url/repositories/IUrlRepository';

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository);

export default container;
