CREATE TABLE usuarios(
    nome varchar(255),
    email varchar(255),
    idade int(3),
);

INSERT INTO
    usuarios
VALUES
    ('Luis', 'luis@gmail.com', 19),
    ('Davi', 'davi@gmail.com', 16);

SELECT
    *
FROM
    usuarios
WHERE
    nome = 'Luis';

UPDATE usuarios SET nome = 'Davisão' WHERE nome = 'Davi';