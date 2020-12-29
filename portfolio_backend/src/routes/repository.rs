use diesel::result::Error;
use rocket::http::Status;
use rocket_contrib::json::{Json, JsonValue};

use crate::db::Conn;
use crate::models::Repository;

#[get("/repository/<user>/<repository>")]
pub fn get_repository(
    user: String,
    repository: String,
    conn: Conn,
) -> Result<Json<Repository>, Status> {
    let repo =
        Repository::get(format!("{}/{}", user, repository).as_str(), &conn).map_err(|err| {
            if let Error::NotFound = err {
                Status::NotFound
            } else {
                Status::InternalServerError
            }
        })?;

    Ok(Json(repo))
}

#[get("/repositories")]
pub fn get_repositories(conn: Conn) -> JsonValue {
    json!(Repository::get_all(&conn))
}
