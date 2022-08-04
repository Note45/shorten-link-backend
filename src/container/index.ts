import { container } from 'tsyringe';

import { UrlRepository } from '../database/repositories/implementations/UrlRepository';
import { IUrlRepository } from '../database/repositories/IUrlRepository';

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository);

export default container;
