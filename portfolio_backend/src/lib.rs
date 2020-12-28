#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate rocket_contrib;

use dotenv::dotenv;

use rocket::fairing::AdHoc;
use rocket::Rocket;

mod config;
mod db;

pub fn rocket() -> Rocket {
    dotenv().ok();

    rocket::custom(config::from_env())
        .mount("/", routes![])
        .attach(db::Conn::fairing())
}
