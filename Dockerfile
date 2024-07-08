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

# Copy backend JAR file
COPY --from=backend-build /app/target/*.jar backend-app.jar

# Copy frontend build files
COPY --from=frontend-build /app/dist/ /frontend

# Expose the application port
EXPOSE 8080

# Set the startup command
CMD ["java", "-jar", "backend-app.jar"]
