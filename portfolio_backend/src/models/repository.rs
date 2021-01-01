use std::env;

use chrono::{Duration, NaiveDateTime, Utc};
use diesel::pg::PgConnection;
use diesel::prelude::*;
use futures::prelude::*;
use hubcaps::{Credentials, Github};
use serde::Serialize;
use tokio::runtime::Runtime;

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
    pub last_updated: Option<NaiveDateTime>,
}

#[derive(Debug, AsChangeset)]
#[table_name = "repositories"]
pub struct RepositoryStats {
    pub description: Option<String>,
    pub language: Option<String>,
    pub stargazers: Option<i32>,
    pub forks: Option<i32>,
    pub last_updated: NaiveDateTime,
}

impl Repository {
    pub fn get(name: &str, conn: &PgConnection) -> Result<Repository, diesel::result::Error> {
        repositories::table.find(name).first::<Repository>(conn)
    }

    pub fn get_all(conn: &PgConnection) -> Vec<Repository> {
        repositories::table.load::<Repository>(conn).unwrap()
    }

    pub fn update_stats(name: &str, other: &RepositoryStats, conn: &PgConnection) -> bool {
        diesel::update(repositories::table.find(name))
            .set(other)
            .execute(conn)
            .is_ok()
    }
}

pub fn update_repositories(conn: &PgConnection) {
    let mut db_repos = Repository::get_all(conn);

    let is_updated = db_repos.iter().all(|repo| match repo.last_updated {
        Some(last_updated) => Utc::now().naive_utc() - last_updated < Duration::hours(1),
        None => false,
    });

    if is_updated {
        return;
    }

    let github_token =
        env::var("GITHUB_TOKEN").expect("GITHUB_TOKEN environment variable not found");

    let github = Github::new("dennispham.me api", Credentials::Token(github_token)).unwrap();

    Runtime::new()
        .unwrap()
        .block_on(
            github
                .repos()
                .iter(&Default::default())
                .for_each(|gh_repo| {
                    let gh_repo = gh_repo.unwrap();

                    for (index, db_repo) in db_repos.iter().enumerate() {
                        if db_repo.name == gh_repo.full_name {
                            let stats = RepositoryStats {
                                description: gh_repo.description.clone(),
                                language: gh_repo.language.clone(),
                                stargazers: Some(gh_repo.stargazers_count as i32),
                                forks: Some(gh_repo.forks_count as i32),
                                last_updated: Utc::now().naive_utc(),
                            };

                            Repository::update_stats(&db_repo.name, &stats, conn);

                            db_repos.remove(index);
                            break;
                        }
                    }

                    async {}
                })
        );
}
