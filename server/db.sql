
--download extension
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE clubs{
    club_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    club_name VARCHAR(255) NOT NULL,
    current_book VARCHAR(255),
    books_Read INT,
    club_admin VARCHAR(255),
}:
