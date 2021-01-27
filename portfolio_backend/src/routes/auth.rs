use rocket::http::{Cookie, Cookies, SameSite, Status};
use rocket_contrib::json::Json;

use crate::auth::{UserToken, generate_token};
use crate::db::Conn;
use crate::models::user::{
    LoginDTO,
    User,
};

#[post("/auth/login", format = "json", data = "<login>")]
pub fn login(login: Json<LoginDTO>, mut cookies: Cookies, conn: Conn) -> Status {
    match User::login(login.0, &conn) {
        Some(result) =>  {
            let token = generate_token(result);

            cookies.add(
                Cookie::build("jwt", token)
                    .http_only(true)
                    .path("/api")
                    .same_site(SameSite::Strict)
                    .finish()
            );

            Status::Ok
        },
        None => Status::BadRequest
    }
}

#[post("/auth/logout")]
pub fn logout(
    token: Result<UserToken, Status>,
    mut cookies: Cookies,
    conn: Conn
) -> Status {
    match token {
        Ok(t) => {
            cookies.remove(
                Cookie::build("jwt", "")
                    .path("/api")
                    .finish()
            );
            User::logout(&t, &conn);
            Status::Ok
        }
        Err(err) => err
    }
}
