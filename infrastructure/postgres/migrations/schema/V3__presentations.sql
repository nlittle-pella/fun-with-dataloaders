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

WITH no_loaders_presentation AS (
    INSERT INTO author.presentation (name) VALUES ('No Loaders') RETURNING id
)
    INSERT INTO author.slide (presentation_id, title, position)
    SELECT id, 'Write the resolver', 1 FROM no_loaders_presentation
    UNION ALL
    SELECT id, 'What is the problem?', 2 FROM no_loaders_presentation
    UNION ALL
    SELECT id, 'What is the solution?', 3 FROM no_loaders_presentation
    UNION ALL
    SELECT id, 'But ... how?', 4 FROM no_loaders_presentation
    UNION ALL
    SELECT id, '🚀 Dataloaders 🚀', 5 FROM no_loaders_presentation;

INSERT INTO author.presentation (name) VALUES ('Dataloaders');
