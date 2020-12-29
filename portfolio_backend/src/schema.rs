table! {
    repositories (name) {
        name -> Text,
        description -> Nullable<Text>,
        language -> Nullable<Text>,
        stargazers -> Nullable<Int4>,
        forks -> Nullable<Int4>,
        ordering -> Int4,
    }
}
