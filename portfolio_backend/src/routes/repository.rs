use diesel::result::{DatabaseErrorKind, Error as DieselError};
use rocket::http::Status;
use rocket_contrib::json::{Json, JsonValue};

use crate::auth::UserToken;
use crate::db::Conn;
use crate::models::repository::{
    Repository,
    RepositoryDTO,
    update_repositories,
};

#[get("/repositories")]
pub fn get_repositories(conn: Conn) -> JsonValue {
    update_repositories(&conn);
    json!(Repository::get_all(&conn))
}

#[get("/repository/<user>/<repository>")]
pub fn get_repository(
    user: String,
    repository: String,
    conn: Conn,
) -> Result<Json<Repository>, Status> {
    update_repositories(&conn);

    let repo =
        Repository::get(format!("{}/{}", user, repository).as_str(), &conn).map_err(|err| {
            if let DieselError::NotFound = err {
                Status::NotFound
            } else {
                Status::InternalServerError
            }
        })?;

    Ok(Json(repo))
}

#[post("/repository", format = "json", data = "<new_repository>")]
pub fn post_resository(
    new_repository: Json<RepositoryDTO>,
    token: Result<UserToken, Status>,
    conn: Conn
) -> Result<Json<Repository>, Status> {
    if let Err(err) = token {
        return Err(err);
    }

    let new_repo = RepositoryDTO {
        ..new_repository.into_inner()
    };

    match Repository::new(new_repo, &conn) {
        Ok(repo) => {
            update_repositories(&conn);

            let repo = Repository::get(repo.name.as_str(), &conn)
                .map_err(|err| match err {
                    DieselError::NotFound => Status::NotFound,
                    _ => Status::InternalServerError,
                })?;

            Ok(Json(repo))
        },
        Err(err) => Err(match err {
            DieselError::DatabaseError(kind, _) => match kind {
                DatabaseErrorKind::UniqueViolation => Status::Conflict,
                _ => Status::InternalServerError,
            },
            _ => Status::InternalServerError,
        })
    }
}

#[delete("/repository", format = "json", data = "<repository>")]
pub fn delete_repository(
    repository: Json<RepositoryDTO>,
    token: Result<UserToken, Status>,
    conn: Conn
) -> Status {
    if let Err(err) = token {
        return err;
    }

    match Repository::delete(repository.name.as_str(), &conn) {
        true => Status::Ok,
        false => Status::InternalServerError,
    }
}
