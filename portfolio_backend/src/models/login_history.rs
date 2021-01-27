use chrono::{NaiveDateTime, Utc};
use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::schema::login_history;
use super::user::User;

#[derive(Associations, Queryable)]
#[belongs_to(User)]
#[table_name = "login_history"]
pub struct LoginHistory {
    pub id: i32,
    pub user_id: i32,
    pub login_timestamp: NaiveDateTime,
}

#[derive(Insertable)]
#[table_name = "login_history"]
pub struct LoginHistoryDTO {
    pub user_id: i32,
    pub login_timestamp: NaiveDateTime
}

impl LoginHistory {
    pub fn create(username: &str, conn: &PgConnection) -> Option<LoginHistoryDTO> {
        match User::get(username, conn) {
            Some(user) => Some(LoginHistoryDTO {
                user_id: user.id,
                login_timestamp: Utc::now().naive_utc()
            }),
            None => None
        }
    }

    pub fn save(login_history: LoginHistoryDTO, conn: &PgConnection) -> bool {
        diesel::insert_into(login_history::table)
            .values(&login_history)
            .execute(conn)
            .is_ok()
    }
}
