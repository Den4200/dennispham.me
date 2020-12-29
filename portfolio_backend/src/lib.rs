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

mod config;
mod db;
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

pub fn rocket() -> Rocket {
    dotenv().ok();

    rocket::custom(config::from_env())
        .mount("/", routes![])
        .attach(db::Conn::fairing())
        .attach(AdHoc::on_attach("Database Migrations", run_migrations))
}
