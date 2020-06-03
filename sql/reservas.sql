CREATE TABLE "reservas" (
"id" SERIAL PRIMARY KEY NOT NULL,
"fecha" datetime,
"completada" boolean,
"cancelada" boolean,
"servicioId" integer REFERENCES servicios(id),
"trabajadorId" integer REFERENCES usuarios(id)
);