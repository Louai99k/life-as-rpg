FROM rust:1.85-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    libxkbcommon-dev \
    libwayland-dev \
    libegl1-mesa-dev \
    libfontconfig-dev \
    libx11-dev \
    libxrandr-dev \
    libxi-dev \
    libxcursor-dev \
    libxinerama-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN rustup component add clippy rustfmt

ARG UID=1000
ARG GID=1000
RUN groupadd --gid $GID dev && \
    useradd --uid $UID --gid $GID --create-home dev

USER dev
WORKDIR /app
