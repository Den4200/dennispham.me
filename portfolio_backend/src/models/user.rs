use bcrypt::{hash, verify, DEFAULT_COST};
use diesel::PgConnection;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::auth::UserToken;
use crate::schema::users;
use super::login_history::LoginHistory;

#[derive(Deserialize, Serialize, Queryable)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password_hash: String,
    pub login_session: Option<String>,
}

#[derive(Deserialize, Serialize)]
pub struct NewUser {
    pub username: String,
    pub password: String,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct UserDTO {
    pub username: String,
    pub password_hash: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginDTO {
    pub username: String,
    pub password: String,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct LoginInfoDTO {
    pub username: String,
    pub login_session: String,
}

impl User {
    pub fn signup(user: NewUser, conn: &PgConnection) -> bool {
        let user = UserDTO {
            username: user.username,
            password_hash: hash(&user.password, DEFAULT_COST).unwrap()
        };

        diesel::insert_into(users::table)
            .values(&user)
            .execute(conn)
            .is_ok()
    }

    pub fn login(login: LoginDTO, conn: &PgConnection) -> Option<LoginInfoDTO> {
        let user = users::table
            .filter(users::username.eq(&login.username))
            .get_result::<User>(conn)
            .unwrap();

        if !user.password_hash.is_empty() && verify(&login.password, &user.password_hash).unwrap() {
            if let Some(login_history) = LoginHistory::create(&user.username, conn) {
                if !LoginHistory::save(login_history, conn) {
                    return None;
                }

                let login_session = User::generate_login_session();
                User::update_login_session(&user.username, &login_session, conn);

                return Some(LoginInfoDTO {
                    username: user.username,
                    login_session: login_session
                });
            }
        }

        None
    }

    pub fn is_valid_login_session(user_token: &UserToken, conn: &PgConnection) -> bool {
        users::table
            .filter(users::username.eq(&user_token.user))
            .filter(users::login_session.eq(&user_token.login_session))
            .get_result::<User>(conn)
            .is_ok()
    }

    pub fn get(username: &str, conn: &PgConnection) -> Option<User> {
        let user = users::table
            .filter(users::username.eq(username))
            .get_result::<User>(conn);

        match user {
            Ok(u) => Some(u),
            Err(_) => None
        }
    }

    pub fn generate_login_session() -> String {
        Uuid::new_v4().to_simple().to_string()
    }

    pub fn update_login_session(username: &str, login_session: &str, conn: &PgConnection) -> bool {
        match User::get(username, conn) {
            Some(user) => {
                diesel::update(users::table.find(user.id))
                    .set(users::login_session.eq(login_session.to_string()))
                    .execute(conn)
                    .is_ok()
            }
            None => false
        }
    }
}
