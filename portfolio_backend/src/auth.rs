use std::env::var;

use chrono::Utc;
use jsonwebtoken::errors::Result;
use jsonwebtoken::TokenData;
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation};
use lazy_static::lazy_static;
use rocket::http::Status;
use rocket::Outcome;
use rocket::response::status;
use rocket::request::{self, FromRequest, Request};
use rocket_contrib::json::Json;
use serde::{Deserialize, Serialize};

use crate::db::Conn;
use crate::models::{
    response::Response,
    user::{
        LoginInfoDTO,
        User,
    },
};

const WEEK: i64 = 60 * 60 * 24 * 7;

lazy_static! {
    static ref SECRET_KEY: Vec<u8> = var("SECRET_KEY").unwrap().into_bytes();
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserToken {
    // issued at
    pub iat: i64,
    // expiration
    pub exp: i64,
    // data
    pub user: String,
    pub login_session: String
}

impl<'a, 'r> FromRequest<'a, 'r> for UserToken {
    type Error = status::Custom<Json<Response>>;

    fn from_request(
        request: &'a Request<'r>,
    ) -> request::Outcome<Self, status::Custom<Json<Response>>> {
        let conn = request.guard::<Conn>().unwrap();

        let failure = Outcome::Failure((
            Status::BadRequest,
            status::Custom(
                Status::Unauthorized,
                Json(Response {
                    message: "invalid token".to_string(),
                    data: serde_json::to_value("").unwrap(),
                })
            )
        ));

        let cookies = request.cookies();
        match cookies.get("jwt").map(|cookie| cookie.value()) {
            Some(token) => {
                if let Ok(token_data) = decode_token(token.to_string()) {
                    if verify_token(&token_data, &conn) {
                        return Outcome::Success(token_data.claims);
                    }
                }

                failure
            },
            None => failure
        }
    }
}

pub fn generate_token(login: LoginInfoDTO) -> String {
    let now = Utc::now().timestamp_nanos() / 1_000_000_000;  // nanoseconds -> seconds

    let payload = UserToken {
        iat: now,
        exp: now + WEEK,
        user: login.username,
        login_session: login.login_session
    };

    let encoding_key = EncodingKey::from_secret(&SECRET_KEY);

    jsonwebtoken::encode(&Header::default(), &payload, &encoding_key).unwrap()
}

fn decode_token(token: String) -> Result<TokenData<UserToken>> {
    let decoding_key = DecodingKey::from_secret(&SECRET_KEY);

    jsonwebtoken::decode::<UserToken>(&token, &decoding_key, &Validation::default())
}

fn verify_token(token_data: &TokenData<UserToken>, conn: &Conn) -> bool {
    User::is_valid_login_session(&token_data.claims, conn)
}
