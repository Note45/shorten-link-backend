import { container } from 'tsyringe';

import { UrlRepository } from '../infra/database/repositories/implementations/UrlRepository';
import { IUrlRepository } from '../infra/database/repositories/IUrlRepository';

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository);

export default container;
