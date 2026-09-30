 # AGRO-01 Backend

 Backend principal de la aplicación AGRO-01. Expone la API para el preregistro, registro y procesamiento de solicitudes, incluyendo la integración con el servicio externo de scoring crediticio.

 ## Descripción

 - Preregistro y registro de solicitudes AGRO-01.
 - Integración con una API externa de predicción para el scoring crediticio.
 - Gestión CRUD de tareas con paginación.
 - Endpoint de salud para verificar la disponibilidad del backend.
 - Documentación interactiva de la API mediante Swagger.

 ## Tecnologías

 - NestJS 11
 - TypeScript
 - TypeORM
 - Oracle Database mediante `oracledb`
 - Passport, JWT y bcrypt
 - Swagger / OpenAPI
 - Jest
 - Pino

 ## Repositorios involucrados

 - [ ] Repositorio de la app móvil
 - [ ] Repositorio del backend principal
 - [ ] Repositorio del servicio de scoring

 ## Configuración rápida

 1. Instala dependencias:

 ```bash
 npm install
 ```

 2. Crea tu archivo de entorno:

 ```bash
 copy .env.example .env
 ```

 3. Configura las credenciales de Oracle, los secretos JWT y la URL del servicio de predicción en `.env`.

 4. Verifica que Oracle y el servicio de scoring estén disponibles antes de iniciar el backend.

 ## Configuración principal

 La API se inicia por defecto en `http://localhost:3000` y utiliza el prefijo global `/api`.

 ```env
 APP_PORT=3000
 APP_PREFIX=api
 PREDICTION_API_URL=http://localhost:3002/api/v1/prediction/predict
 DB_CONNECT_STRING=localhost:1521/XEPDB1
 ```

 La lista completa de variables y sus valores de ejemplo se encuentra en `.env.example`.

 ## Endpoints principales

 Todos los endpoints utilizan el prefijo `/api`:

 - `POST /api/agro-01/preregistro`: crear un preregistro AGRO-01.
 - `POST /api/agro-01/registro`: registrar una solicitud AGRO-01.
 - `GET /api/health`: verificar el estado del backend.
 - `POST /api/tareas`: crear una tarea.
 - `GET /api/tareas`: listar tareas con `page` y `limit` opcionales.
 - `GET /api/tareas/:id`: obtener una tarea.
 - `PATCH /api/tareas/:id`: actualizar una tarea.
 - `DELETE /api/tareas/:id`: eliminar una tarea.

 ## Documentación de la API

 Con el backend iniciado, Swagger está disponible en:

 ```text
 http://localhost:3000/api/docs
 ```

 ## Comandos principales

 ```bash
 npm run start:dev
 npm run build
 npm run start
 npm run start:prod
 ```

 ## Pruebas y calidad

 ```bash
 npm run test
 npm run test:e2e
 npm run test:cov
 npm run lint
 npm run format
 ```

 ## Base de datos

 El backend utiliza Oracle y la gestión del esquema se realiza externamente. La configuración de conexión se define mediante `DB_CONNECT_STRING`, `DB_USERNAME`, `DB_PASSWORD` y `ORACLE_SCHEMA`.

 ```bash
 npm run db:check
 ```

 ## Requisito

 La app móvil requiere que este backend esté activo para que funcionen los flujos de preregistro, registro y scoring. Para obtener el resultado de scoring también debe estar disponible el servicio externo configurado en `PREDICTION_API_URL`.
