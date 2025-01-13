# Use a base image that suits your project
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install kubectl
RUN apt-get update && \
    apt-get install -y curl apt-transport-https && \
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the default user to vscode
USER vscode
