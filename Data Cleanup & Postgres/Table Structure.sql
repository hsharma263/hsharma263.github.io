

CREATE TABLE "earthquake" (
    "id" VARCHAR(50)   NOT NULL,
    "type" VARCHAR(50)   NOT NULL,
    "depth" FLOAT   NOT NULL,
    "mag" FLOAT   NOT NULL,
    "magtype" VARCHAR(20)   NOT NULL,
    "rootmeansquare" FLOAT   NOT NULL,
    "status" VARCHAR(30)   NOT NULL,
    CONSTRAINT "pk_earthquake" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "location" (
    "id" VARCHAR(50)   NOT NULL,
    "place" VARCHAR(255)   NOT NULL,
    "latitude" FLOAT   NOT NULL,
    "longitude" FLOAT   NOT NULL,
    "locationSource" VARCHAR(20)   NOT NULL,
    "city" VARCHAR(50)   NOT NULL,
    "county" VARCHAR(50)   NOT NULL,
    "state" VARCHAR(50)   NOT NULL,
    "country" VARCHAR(50)   NOT NULL,
    "mindepth" FLOAT   NOT NULL,
    "maxdepth" FLOAT   NOT NULL,
    "minmag" FLOAT   NOT NULL,
    "maxmag" FLOAT   NOT NULL,
    "count" VARCHAR(50)   NOT NULL,
    "mindate" DATE   NOT NULL,
    "maxdate" DATE   NOT NULL
);

CREATE TABLE "time" (
    "id" VARCHAR(50)   NOT NULL,
    "time" timestamp   NOT NULL,
    "date" date   NOT NULL,
    "lastupddatetime" timestamp   NOT NULL
);

ALTER TABLE "location" ADD CONSTRAINT "fk_location_id" FOREIGN KEY("id")
REFERENCES "earthquake" ("id");

ALTER TABLE "time" ADD CONSTRAINT "fk_time_id" FOREIGN KEY("id")
REFERENCES "earthquake" ("id");

