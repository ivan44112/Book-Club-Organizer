
--download extension
create extension if not exists "uuid-ossp";

CREATE TABLE users
(
    user_id       uuid PRIMARY KEY DEFAULT
                                       uuid_generate_v4(),
    user_name     VARCHAR(255) NOT NULL,
    user_email    VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)

CREATE TABLE clubs
(
    club_id      uuid PRIMARY KEY DEFAULT
                                      uuid_generate_v4(),
    club_name    VARCHAR(255) NOT NULL,
    current_book VARCHAR(255),
    books_Read   INT,
    club_admin   VARCHAR(255),
)

CREATE TABLE club_members
(
    club_member_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id uuid,
    user_id uuid,
    pages_read INT,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
