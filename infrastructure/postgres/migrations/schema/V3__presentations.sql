CREATE TABLE author.presentation
(
    "id"                        UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"                      TEXT NOT NULL
);

CREATE TABLE author.slide
(
    "id"                        UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "presentation_id"           UUID NOT NULL,
    "title"                     TEXT NOT NULL,
    "position"                  INT NOT NULL,
    CONSTRAINT "presentation_id_foreign_key" 
        FOREIGN KEY ("presentation_id") 
            REFERENCES author.presentation ("id")
                ON DELETE CASCADE
);

CREATE TABLE author.bullet_point
(
    "id"                        UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    "slide_id"                  UUID NOT NULL,
    "content"                   TEXT NOT NULL,
    "position"                  INT NOT NULL,
    CONSTRAINT "slide_id_foreign_key" 
        FOREIGN KEY ("slide_id") 
            REFERENCES author.slide ("id")
                ON DELETE CASCADE
);

INSERT INTO author.presentation (name) VALUES ('Dataloaders');
