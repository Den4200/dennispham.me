use rocket::http::{Cookie, Cookies, SameSite, Status};
use rocket::response::status;
use rocket_contrib::json::Json;

use crate::auth::generate_token;
use crate::db::Conn;
use crate::models::{
    response::Response,
    user::{
        LoginDTO,
        User,
    },
};

#[post("/auth/login", format = "json", data = "<login>")]
pub fn login(mut cookies: Cookies, login: Json<LoginDTO>, conn: Conn) -> status::Custom<Json<Response>> {
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

            status::Custom(
                Status::Ok,
                Json(Response {
                    message: "login successful".to_string(),
                    data: serde_json::to_value("").unwrap(),
                })
            )
        },
        None => status::Custom(
            Status::BadRequest,
            Json(Response {
                message: "login failed".to_string(),
                data: serde_json::to_value("").unwrap(),
            })
        )
    }
}
