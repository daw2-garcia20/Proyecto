CREATE TABLE "valoraciones" (
"id" SERIAL PRIMARY KEY NOT NULL,
"nombreCliente" character varying(255),
"comentario" character varying (255),
"valoracion" integer,
"servicioId" integer REFERENCES servicios(id)
);