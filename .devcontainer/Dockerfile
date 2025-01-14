# Use a base image with Ubuntu
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install kubectl
RUN apt-get update && \
    apt-get install -y curl apt-transport-https && \
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/ && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    apt-get install -y unzip && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Docker and its dependencies
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y docker-ce docker-ce-cli containerd.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Docker-in-Docker wrapper script
RUN curl -fsSL https://raw.githubusercontent.com/docker-library/docker/master/dockerd-entrypoint.sh -o /usr/local/bin/dockerd-entrypoint.sh && \
    chmod +x /usr/local/bin/dockerd-entrypoint.sh

# Install Node.js and npm (LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add the 'vscode' user to the Docker group
RUN if id "vscode" &>/dev/null; then \
        groupadd -f docker && \
        usermod -aG docker vscode; \
    fi

# Expose Docker API port for DinD
EXPOSE 2375

# Use Docker-in-Docker entrypoint
ENTRYPOINT ["dockerd-entrypoint.sh"]
CMD ["dockerd"]
