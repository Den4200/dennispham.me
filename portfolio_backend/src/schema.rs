table! {
    login_history (id) {
        id -> Int4,
        user_id -> Int4,
        login_timestamp -> Timestamp,
    }
}

table! {
    repositories (name) {
        name -> Text,
        description -> Nullable<Text>,
        language -> Nullable<Text>,
        stargazers -> Nullable<Int4>,
        forks -> Nullable<Int4>,
        ordering -> Int4,
        last_updated -> Nullable<Timestamp>,
    }
}

table! {
    users (id) {
        id -> Int4,
        username -> Text,
        password_hash -> Text,
        login_session -> Nullable<Text>,
    }
}

joinable!(login_history -> users (user_id));

allow_tables_to_appear_in_same_query!(
    login_history,
    repositories,
    users,
);
