#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

use dotenv::dotenv;
use rocket::fairing::AdHoc;
use rocket::Rocket;
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};

mod config;
mod db;
mod models;
mod routes;
mod schema;

embed_migrations!();

fn run_migrations(rocket: Rocket) -> Result<Rocket, Rocket> {
    let conn = db::Conn::get_one(&rocket).expect("Failed to get database connection..");

    match embedded_migrations::run_with_output(&*conn, &mut std::io::stdout()) {
        Ok(()) => {
            println!("Successfully ran database migrations.");
            Ok(rocket)
        }
        Err(e) => {
            println!("Failed to run database migrations: {:?}", e);
            Err(rocket)
        }
    }
}

fn create_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "https://dennispham.me",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]);

    CorsOptions {
        allowed_origins,
        ..Default::default()
    }
    .to_cors()
    .expect("Failed to create CORS..")
}

pub fn rocket() -> Rocket {
    dotenv().ok();

    rocket::custom(config::from_env())
        .mount(
            "/",
            routes![
                routes::repository::get_repository,
                routes::repository::get_repositories,
            ],
        )
        .attach(create_cors())
        .attach(db::Conn::fairing())
        .attach(AdHoc::on_attach("Database Migrations", run_migrations))
}
