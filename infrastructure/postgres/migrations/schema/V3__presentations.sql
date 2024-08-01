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
, no_loaders_slides AS (
    INSERT INTO author.slide (presentation_id, title, position)
        SELECT id, 'Write the resolvers', 1 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'Pella GraphQL Framework Datasources', 2 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'What is the problem?', 3 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'What is the solution?', 4 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'But ... how?', 5 FROM no_loaders_presentation
        UNION ALL
        SELECT id, '🚀 Dataloaders 🚀', 6 FROM no_loaders_presentation
        RETURNING id, title
)
INSERT INTO author.bullet_point (slide_id, content, position)
    SELECT id, 'src/graphql/Query/slides.js', 1 FROM no_loaders_slides WHERE title = 'Write the resolvers'
    UNION ALL
    SELECT id, 'src/graphql/Slide/bulletPoints.js', 2 FROM no_loaders_slides WHERE title = 'Write the resolvers'
    UNION ALL
    SELECT id, 'Point 1', 1 FROM no_loaders_slides WHERE title = 'Pella GraphQL Framework Datasources'
    UNION ALL
    SELECT id, 'Point 2', 2 FROM no_loaders_slides WHERE title = 'Pella GraphQL Framework Datasources'
    UNION ALL
    SELECT id, 'Just like I''m showing the bullet points here slide-by-slide', 1 FROM no_loaders_slides WHERE title = 'What is the problem?'
    UNION ALL
    SELECT id, 'Our bullet points resolver goes to the database for bullet points slide-by-slide', 2 FROM no_loaders_slides WHERE title = 'What is the problem?'
    UNION ALL
    SELECT id, 'This is called the N+1 problem', 3 FROM no_loaders_slides WHERE title = 'What is the problem?'
    UNION ALL
    SELECT id, 'We go to the database 1 time and it returns N slides', 4 FROM no_loaders_slides WHERE title = 'What is the problem?'
    UNION ALL
    SELECT id, 'Then we go back to the database N more times, once for each slide, to get the bullet points', 5 FROM no_loaders_slides WHERE title = 'What is the problem?'
    UNION ALL
    SELECT id, 'Go to the database for the slides (still 1 trip for N slides)', 1 FROM no_loaders_slides WHERE title = 'What is the solution?'
    UNION ALL
    SELECT id, 'But, now we need to BATCH up all of the slide ids', 2 FROM no_loaders_slides WHERE title = 'What is the solution?'
    UNION ALL
    SELECT id, 'Handler is invoked FOR EACH slide', 1 FROM no_loaders_slides WHERE title = 'But ... how?'
    UNION ALL
    SELECT id, 'How do we get access to all of the slides at once?', 2 FROM no_loaders_slides WHERE title = 'But ... how?'
    UNION ALL
    SELECT id, 'We need to create a batching function OUTSIDE of the context of the handler', 1 FROM no_loaders_slides WHERE title = '🚀 Dataloaders 🚀'
    UNION ALL
    SELECT id, 'Enter dataloaders!', 2 FROM no_loaders_slides WHERE title = '🚀 Dataloaders 🚀';


INSERT INTO author.presentation (name) VALUES ('Dataloaders');
-- Interface
-- Requirements
-- Demonstrate the errors with the tests
-- Go back to data loader to show what we do to make sure we meet the requirements
