CREATE TABLE "noticias" (
"id" SERIAL PRIMARY KEY NOT NULL,
"autor" character varying(255),
"foto" character varying(255),
"titulo" character varying(255),
"descripcion" character varying(255)
);