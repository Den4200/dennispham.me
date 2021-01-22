use rocket::http::Status;
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
pub fn login(login: Json<LoginDTO>, conn: Conn) -> status::Custom<Json<Response>> {
    match User::login(login.0, &conn) {
        Some(result) => status::Custom(
            Status::Ok,
            Json(Response {
                message: "login successful".to_string(),
                data: serde_json::to_value(
                    json!({ "token": generate_token(result), "type": "Bearer" })
                ).unwrap(),
            })
        ),
        None => status::Custom(
            Status::BadRequest,
            Json(Response {
                message: "login failed".to_string(),
                data: serde_json::to_value("").unwrap(),
            })
        )
    }
}
