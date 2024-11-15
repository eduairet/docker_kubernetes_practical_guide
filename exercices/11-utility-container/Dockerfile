# docker build -t rust:utility .
# docker run --name my-rust-container -it --rm -v "/app/path:/app" rust:utility init --vcs=none
# docker run --name my-rust-container -it --rm -v "/app/path:/app" rust:utility build

FROM rust
WORKDIR /app
ENTRYPOINT [ "cargo" ]