use rocket::http::{Cookie, Cookies, SameSite, Status};
use rocket_contrib::json::Json;

use crate::auth::generate_token;
use crate::db::Conn;
use crate::models::user::{
    LoginDTO,
    User,
};

#[post("/auth/login", format = "json", data = "<login>")]
pub fn login(mut cookies: Cookies, login: Json<LoginDTO>, conn: Conn) -> Status {
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
