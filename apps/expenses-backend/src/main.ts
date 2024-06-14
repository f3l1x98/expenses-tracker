import { initApp } from './app/app';
import { initOpenApi } from './app/openapi';

async function bootstrap() {
  const app = await initApp();
  initOpenApi(app);
  await app.listen(3000);
}
bootstrap().then().catch(console.error);
