# TODO
- Add automapper: https://www.npmjs.com/package/@automapper/nestjs:
  - Install and use transformer-plugin
    -> Does not work due to https://github.com/nartc/mapper/pull/619
  - Currently not usable with NestJS without --legacy-peer-deps, see https://github.com/nartc/mapper/issues/606
    -> Open PR: https://github.com/nartc/mapper/pull/615
  -> FOR SOME REASON THE AUTOMATIC MAPPING USING RETURN TYPE ANNOTATIONS OR UseInterceptors DECORATOR DOES NOT WORK

# Database migrations

1. Make the changes in the corresponding `.entity.ts` files and make sure they are added to `db-config.service.ts`
2. Generate migrations with `npm run migrations:generate --name=<name>`.<br />Example: `nx run hub-backend:migrations:generate --name=Init`.
3. Add the newly generated migrations file to the array in `db-config.service.ts`.

Note: Migrations can be manually run with `npm run migrations:run` and reverted with `npm run migrations:revert`
