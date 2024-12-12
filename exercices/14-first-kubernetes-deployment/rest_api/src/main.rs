use axum::{routing::get, Json, Router};
use rand::Rng;
use serde::Serialize;
use std::net::SocketAddr;

#[derive(Serialize)]
struct RandomNumberResponse {
    number: u8,
}

async fn get_random_number() -> Json<RandomNumberResponse> {
    let mut rng = rand::thread_rng();
    let number = rng.gen_range(1..=10);
    Json(RandomNumberResponse { number })
}

#[tokio::main]
async fn main() {
    const PORT: u16 = 8080;
    let app = Router::new().route("/random", get(get_random_number));

    let addr = SocketAddr::from(([0, 0, 0, 0], PORT));
    println!("Listening API on port {}", PORT);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
