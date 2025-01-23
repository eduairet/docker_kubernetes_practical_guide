FROM rust:latest
COPY . .
RUN cargo build --release
EXPOSE 80
CMD ["cargo", "run", "--release"]
