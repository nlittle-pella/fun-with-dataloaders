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
        SELECT id, 'What is the problem?', 2 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'What is the solution?', 3 FROM no_loaders_presentation
        UNION ALL
        SELECT id, 'But ... how?', 4 FROM no_loaders_presentation
        UNION ALL
        SELECT id, '🚀 Dataloaders 🚀', 5 FROM no_loaders_presentation
        RETURNING id, title
)
INSERT INTO author.bullet_point (slide_id, content, position)
    SELECT id, 'src/graphql/Query/slides.js', 1 FROM no_loaders_slides WHERE title = 'Write the resolvers'
    UNION ALL
    SELECT id, 'src/graphql/Slide/bulletPoints.js', 2 FROM no_loaders_slides WHERE title = 'Write the resolvers'
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
    SELECT id, 'But, now we need to BATCH up of the bullet point requests', 2 FROM no_loaders_slides WHERE title = 'What is the solution?'
    UNION ALL
    SELECT id, 'Handler is invoked FOR EACH slide', 1 FROM no_loaders_slides WHERE title = 'But ... how?'
    UNION ALL
    SELECT id, 'How do we get access to all of the slides at once?', 2 FROM no_loaders_slides WHERE title = 'But ... how?'
    UNION ALL
    SELECT id, 'We need to create a batching function', 3 FROM no_loaders_slides WHERE title = 'But ... how?';


WITH loaders_presentation AS (
    INSERT INTO author.presentation (name) VALUES ('Dataloaders') RETURNING id
)
, loaders_slides AS (
    INSERT INTO author.slide (presentation_id, title, position)
        SELECT id, 'What are they?', 1 FROM loaders_presentation
        -- include link ^^
        UNION ALL
        SELECT id, 'What are the benefits?', 2 FROM loaders_presentation
        UNION ALL
        SELECT id, 'Dataloaders interface', 3 FROM loaders_presentation
        -- include link ^^
        UNION ALL
        SELECT id, 'Refactor!', 4 FROM loaders_presentation
        UNION ALL
        SELECT id, 'Data sources function is critical!', 5 FROM loaders_presentation
        UNION ALL
        SELECT id, 'Dataloaders requirements', 6 FROM loaders_presentation
        -- include link ^^
        UNION ALL
        SELECT id, 'How we guarantee the requirements', 7 FROM loaders_presentation
        UNION ALL
        SELECT id, 'Questions?', 8 FROM loaders_presentation
        RETURNING id, title
)
INSERT INTO author.bullet_point (slide_id, content, position)
    SELECT id, 'A dataloader is a batching utility', 1 FROM loaders_slides WHERE title = 'What are they?'
    UNION ALL
    SELECT id, 'that allows you to request values individually in your handlers', 2 FROM loaders_slides WHERE title = 'What are they?'
    UNION ALL
    SELECT id, 'and yet only make one trip to your datasource', 3 FROM loaders_slides WHERE title = 'What are they?'
    UNION ALL
    SELECT id, 'Reduced request latency', 1 FROM loaders_slides WHERE title = 'What are the benefits?'
    UNION ALL
    SELECT id, 'Reduced load on database', 2 FROM loaders_slides WHERE title = 'What are the benefits?'
    UNION ALL
    SELECT id, 'The batch function!', 1 FROM loaders_slides WHERE title = 'Dataloaders interface'
    UNION ALL
    SELECT id, 'Accepts an array of keys', 2 FROM loaders_slides WHERE title = 'Dataloaders interface'
    UNION ALL
    SELECT id, 'Returns an array of values', 3 FROM loaders_slides WHERE title = 'Dataloaders interface'
    UNION ALL
    SELECT id, 'Update our load function', 1 FROM loaders_slides WHERE title = 'Refactor!'
    UNION ALL
    SELECT id, 'Notice that we didn''t touch our application logic', 2 FROM loaders_slides WHERE title = 'Refactor!'
    UNION ALL
    SELECT id, 'We simply changed our load function to accept and request by an array of keys', 3 FROM loaders_slides WHERE title = 'Refactor!'
    UNION ALL
    SELECT id, 'And wrapped it in a Dataloader', 4 FROM loaders_slides WHERE title = 'Refactor!'
    UNION ALL
    SELECT id, 'https://github.com/Pella-Digital-Team/graphql-api/blob/85b72e1a62e27d6b2ee9d6be47d7a64f9c2f0450/src/resolvers.js#L279-L283', 1 FROM loaders_slides WHERE title = 'Data sources function is critical!'
    UNION ALL
    SELECT id, 'Our data loaders need to be created OUTSIDE the scope of our handlers', 2 FROM loaders_slides WHERE title = 'Data sources function is critical!'
    UNION ALL
    SELECT id, 'If data loader is created INSIDE of handler then it won''t work.', 3 FROM loaders_slides WHERE title = 'Data sources function is critical!'
    UNION ALL
    SELECT id, 'You would be creating a new instance at each invocation of your handler.', 4 FROM loaders_slides WHERE title = 'Data sources function is critical!'
    UNION ALL
    SELECT id, 'Thus, you would be creating a new "batch" in each handler.', 5 FROM loaders_slides WHERE title = 'Data sources function is critical!'
    UNION ALL
    SELECT id, 'Accepts an array of keys', 1 FROM loaders_slides WHERE title = 'Dataloaders requirements'
    UNION ALL
    SELECT id, 'Returns a promise of an array of values', 2 FROM loaders_slides WHERE title = 'Dataloaders requirements'
    UNION ALL
    SELECT id, 'keys.length === values.length', 3 FROM loaders_slides WHERE title = 'Dataloaders requirements'
    UNION ALL
    SELECT id, 'Each item''s index in the array of values must correspond to the same item''s index in the array of keys', 4 FROM loaders_slides WHERE title = 'Dataloaders requirements'
    UNION ALL
    SELECT id, 'src/repositories/presentations.js -- getBulletsBySlideIds', 1 FROM loaders_slides WHERE title = 'How we guarantee the requirements';
-- Interface
-- Requirements
-- Demonstrate the errors with the tests
-- Go back to data loader to show what we do to make sure we meet the requirements
