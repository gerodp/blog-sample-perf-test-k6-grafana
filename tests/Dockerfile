# AMD64 Image for X86 architecture
FROM --platform=linux/amd64 golang:latest as stage-amd64

WORKDIR /

RUN wget -c https://github.com/grafana/k6/releases/download/v0.42.0/k6-v0.42.0-linux-amd64.tar.gz -O - | tar -xz
RUN mv k6-v0.42.0-linux-amd64/k6 .
RUN chmod +x k6


# Declare TARGETARCH to make it available
ARG TARGETARCH


# ARM64 Image for Mac with M1 chip
FROM --platform=linux/arm64 golang:latest as stage-arm64

WORKDIR /

RUN wget -c https://github.com/grafana/k6/releases/download/v0.42.0/k6-v0.42.0-linux-arm64.tar.gz -O - | tar -xz 

RUN mv k6-v0.42.0-linux-arm64/k6 .
RUN chmod +x k6

# Declare TARGETARCH to make it available
ARG TARGETARCH

# Select final stage based on TARGETARCH ARG
FROM stage-${TARGETARCH} as final

# Set the working directory
WORKDIR /app

RUN go install github.com/githubnemo/CompileDaemon@v1.4.0

ARG TEST

ENTRYPOINT CompileDaemon -build="true" -command="/k6 run ${TEST}" -polling -pattern=test.js$
