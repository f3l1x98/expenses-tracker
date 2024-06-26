# Startup backend
1. Configure database using `./.env` file
2. Start
   ```bash
   npm run start
   ```

# Database migrations

1. Make the changes in the corresponding `.entity.ts` files and make sure they are added to `db-config.service.ts`
2. Generate migrations with `nx run expenses-backend:migrations:generate --name=<name>`.<br />Example: `nx run expenses-backend:migrations:generate --name=Init`.
3. Add the newly generated migrations file to the array in `db-config.service.ts`.

Note: Migrations can be manually run with `nx run expenses-backend:migrations:run` and reverted with `nx run expenses-backend:migrations:revert`
Note: It is not possible to use `npm run nx` for generating migrations, due to `npm run nx` consuming all parameters
