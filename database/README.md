# Configuracion de Base de Datos

La aplicacion se conecta a una base de datos Oracle existente mediante TypeORM
y el driver `oracledb`.

## Principios

- La estructura de Oracle es administrada externamente.
- La aplicacion no crea tablas ni ejecuta migraciones.
- La aplicacion no ejecuta seeders ni scripts de limpieza.
- TypeORM usa `synchronize: false` y `migrationsRun: false`.
- Las entidades y repositorios se agregaran solo cuando una funcionalidad los necesite.

## Variables de entorno

Configura estas variables en `.env`:

```env
DB_CONNECT_STRING=localhost:1521/XEPDB1
DB_USERNAME=oracle_user
DB_PASSWORD=oracle_password
DB_LOGGING=false
```

`DB_CONNECT_STRING` debe corresponder al formato aceptado por Oracle, por
 ejemplo `host:puerto/servicio` o un alias definido en `tnsnames.ora`.

## Comandos

```powershell
npm install
npm run db:check
npm run start:dev
```

No se deben ejecutar comandos de migracion, sincronizacion, seed o reset desde
esta aplicacion.

## Requisitos de Oracle

El usuario de base de datos debe tener permisos de conexion y de lectura sobre
los objetos que utilicen los modulos de la aplicacion. Para operaciones de
escritura se deben confirmar previamente los permisos y reglas de la base
existente.

En entornos donde `oracledb` necesite Thick Mode, tambien debe instalarse el
Oracle Instant Client compatible con la version de Node.js del proyecto.
