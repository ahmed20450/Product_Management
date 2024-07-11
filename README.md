# Product Management

A CRUD application for product management using Spring Boot, Angular, and Oracle 11g XE.

## Technologies

- Backend: Spring Boot (Java 17)
- Frontend: Angular (Node.js 16)
- Database: Oracle 11g XE
- Containerization: Docker
- CI/CD: GitHub Actions

## Quick Installation

```bash
# Clone the project
git clone https://github.com/ahmed20450/Product_management.git
cd Product_management

# Backend (Spring Boot)
cd back
mvn clean package
java -jar target/backend-app.jar

# Frontend (Angular)
cd ../front
npm install
ng serve

# Access: http://localhost:4200
