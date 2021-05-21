
--download extension
create extension if not exists "uuid-ossp";

CREATE TABLE users
(
    user_id       uuid PRIMARY KEY DEFAULT
                                       uuid_generate_v4(),
    name     VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('cest', current_timestamp)
)

CREATE TABLE clubs(
    club_id      uuid PRIMARY KEY DEFAULT
                                      uuid_generate_v4(),
    club_name    VARCHAR(255) NOT NULL,
    club_admin   VARCHAR(255) NOT NULL,
    current_book VARCHAR(255) SET DEFAULT NULL,
    books_Read   INT SET DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('cest', current_timestamp);
)

CREATE TABLE club_members
(
    club_member_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id uuid,
    user_id uuid,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)

/*
 status=false(unfinished book)
        =true(finished book)
 */
CREATE TABLE club_books
(
    club_books_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id VARCHAR(20),
    club_id uuid,
    reading_status boolean DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('cest', current_timestamp),
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
)

CREATE TABLE club_books_comments
(
    club_books_comments_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_books_id uuid,
    user_id uuid,
    comment VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('cest', current_timestamp),
    FOREIGN KEY (club_books_id) REFERENCES clubs_books(club_books_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)

/*
 reading_status=0(user wants to read this book)
            =1(user is reading that book)
            =2(user read that book)
 favorite_status=false(not favorite)
                =true(favorited)
 */
CREATE TABLE user_books
(
    user_books_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id VARCHAR(20) NOT NULL,
    user_id uuid NOT NULL,
    club_id uuid NOT NULL,
    reading_status int default 1,
    favorite_status boolean default false,
    current_page int default 0,
    date_started TIMESTAMP WITH TIME ZONE DEFAULT timezone('cest', current_timestamp),
    date_finished TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
)

CREATE TABLE book_voting
(
    book_voting_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id VARCHAR(20) NOT NULL,
    user_id uuid NOT NULL,
    club_id uuid NOT NULL,
    votes int default 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE
)

CREATE TABLE book_votes
(
    book_votes_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_voting_id uuid NOT NULL,
    user_id uuid NOT NULL,
    vote boolean default false,
    FOREIGN KEY (book_voting_id) REFERENCES book_voting(book_voting_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)
