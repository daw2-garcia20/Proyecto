CREATE TABLE "usuarios" (
"id" SERIAL PRIMARY KEY NOT NULL,
"username" character varying(255),
"password" character varying (255),
"nombre" character varying(255),
"apellidos" character varying(255),
"admin" boolean,
"rolId" integer REFERENCES roles(id)
);