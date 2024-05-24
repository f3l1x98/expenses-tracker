import { initApp } from './app/app';

async function bootstrap() {
  const app = await initApp();
  await app.listen(3000);
}
bootstrap();
