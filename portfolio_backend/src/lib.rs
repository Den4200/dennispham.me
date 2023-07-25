#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate diesel;
#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

use std::env::var;

use dotenv::dotenv;
use rocket::fairing::AdHoc;
use rocket::Rocket;
use rocket_cors::{AllowedOrigins, Cors, CorsOptions};

mod auth;
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
        "https://canary.dennispham.me",
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

fn create_default_user(rocket: Rocket) -> Result<Rocket, Rocket> {
    let conn = db::Conn::get_one(&rocket).expect("Failed to get database connection..");

    let username = var("ADMIN_USERNAME").unwrap_or_else(|_| "admin".to_string());
    let password = var("ADMIN_PASSWORD").unwrap_or_else(|_| "password".to_string());

    let user = models::user::NewUser {
        username,
        password,
    };

    if models::user::User::signup(user, &conn) {
        println!("Default user created.");
    } else {
        println!("Default user already exists.")
    }

    Ok(rocket)
}

pub fn rocket() -> Rocket {
    dotenv().ok();

    rocket::custom(config::from_env())
        .mount(
            "/api",
            routes![
                routes::auth::login,
                routes::auth::logout,
                routes::repository::get_repositories,
                routes::repository::get_repository,
                routes::repository::post_resository,
                routes::repository::delete_repository,
            ],
        )
        .attach(create_cors())
        .attach(db::Conn::fairing())
        .attach(AdHoc::on_attach("Database Migrations", run_migrations))
        .attach(AdHoc::on_attach("Create default user", create_default_user))
}
