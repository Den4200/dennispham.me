use std::collections::HashMap;
use std::env;

use rocket::config::{Config, Environment, Value};

/// Creates rocket config from environment variables.
pub fn from_env() -> Config {
    let environment = Environment::active().expect("No environment found.");

    let address = env::var("IP_ADDRESS").unwrap_or_else(|_| "0.0.0.0".to_string());

    let port = env::var("PORT")
        .unwrap_or_else(|_| "8000".to_string())
        .parse::<u16>()
        .expect("PORT environment variable not found.");

    Config::build(environment)
        .environment(environment)
        .address(address)
        .port(port)
        .finalize()
        .unwrap()
}
