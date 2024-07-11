# ... (les étapes précédentes restent inchangées)

FROM openjdk:17-jdk-slim
WORKDIR /app

# Copier le JAR du backend
COPY --from=backend-build /app/target/*.jar backend-app.jar

# Copier les fichiers du frontend
COPY --from=frontend-build /app/dist/ /frontend

# Copier le fichier de configuration
COPY src/main/resources/application.properties .

# Installer wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8081

# Attendre que la base de données soit prête avant de démarrer l'application
CMD ["/bin/sh", "-c", "/wait-for-it.sh host.docker.internal:1521 -- java -jar backend-app.jar"]