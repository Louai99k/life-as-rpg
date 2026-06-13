FROM node:24-bookworm-slim AS node

FROM rust:1.85-slim-bookworm

COPY --from=node /usr/local/bin/ /usr/local/bin/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    file \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    libssl-dev \
    libwebkit2gtk-4.1-dev \
    libxdo-dev \
    pkg-config \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN rustup component add clippy rustfmt && \
    corepack enable

ARG UID=1000
ARG GID=1000
RUN groupadd --gid $GID dev && \
    useradd --uid $UID --gid $GID --create-home dev

USER dev
WORKDIR /app
