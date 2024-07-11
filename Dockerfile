# Stage 1: Build the frontend
FROM node:16 AS frontend-build
WORKDIR /app
COPY front/package.json front/package-lock.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# Stage 2: Build the backend
FROM maven:3.8.1-openjdk-17 AS backend-build
WORKDIR /app
COPY back/pom.xml .
COPY back/src ./src
RUN mvn clean package

# Stage 3: Final stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Install netcat for database connection check
RUN apt-get update && apt-get install -y netcat-openbsd

# Copy backend JAR file
COPY --from=backend-build /app/target/*.jar backend-app.jar

# Copy frontend build files
COPY --from=frontend-build /app/dist/ /frontend

# Copy application.properties
COPY back/src/main/resources/application.properties .

# Create wait-for-oracle script
RUN echo '#!/bin/sh\n\
    set -e\n\
    host="$1"\n\
    port="$2"\n\
    shift 2\n\
    cmd="$@"\n\
    until nc -z "$host" "$port"; do\n\
    >&2 echo "Oracle is unavailable - sleeping"\n\
    sleep 1\n\
    done\n\
    >&2 echo "Oracle is up - executing command"\n\
    exec $cmd' > wait-for-oracle.sh && chmod +x wait-for-oracle.sh

# Expose the application port
EXPOSE 8081

# Set the startup command
CMD ["./wait-for-oracle.sh", "host.docker.internal", "1521", "java", "-jar", "backend-app.jar"]