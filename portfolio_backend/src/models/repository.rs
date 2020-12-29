use diesel::pg::PgConnection;
use diesel::prelude::*;
use diesel::result::Error;
use serde::Serialize;

use crate::schema::repositories;

#[derive(Debug, Insertable, Serialize, Queryable)]
#[table_name = "repositories"]
pub struct Repository {
    pub name: String,
    pub description: Option<String>,
    pub language: Option<String>,
    pub stargazers: Option<i32>,
    pub forks: Option<i32>,
    pub ordering: i32,
}

impl Repository {
    pub fn get(name: &str, conn: &PgConnection) -> Result<Repository, Error> {
        repositories::table.find(name).first::<Repository>(conn)
    }

    pub fn get_all(conn: &PgConnection) -> Vec<Repository> {
        repositories::table.load::<Repository>(conn).unwrap()
    }
}
