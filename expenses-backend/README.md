# Startup backend
1. Configure database using `./.env` file
2. Start
   ```bash
   npm run start
   ```

# Database migrations

1. Make the changes in the corresponding `.entity.ts` files and make sure they are added to `db-config.service.ts`
2. Generate migrations with `npm run migrations:generate --name=<name>`.<br />Example: `npm run migrations:generate --name=Init`.
3. Add the newly generated migrations file to the array in `db-config.service.ts`.

Note: Migrations can be manually run with `npm run migrations:run` and reverted with `npm run migrations:revert`
