CREATE TABLE "servicios" (
"id" SERIAL PRIMARY KEY NOT NULL,
"nombre" character varying(255),
"precio" character varying(255),
"categoriaId" integer REFERENCES categorias(id)
);