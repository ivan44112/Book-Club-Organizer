
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

CREATE TABLE books
(
    book_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_name VARCHAR(255) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    pages_num INT NOT NULL,
    rating VARCHAR(255) NOT NULL
)

/*
 is_reading=0(user currently reading this book)
            =1(user read that book)
 */
CREATE TABLE user_books
(
    user_books_id      uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id uuid NOT NULL,
    user_id uuid NOT NULL,
    is_reading boolean NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)