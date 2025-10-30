# Multi-stage build para otimizar tamanho
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar pom.xml e baixar dependências (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar código fonte e buildar
COPY src ./src
RUN mvn clean package -DskipTests

# Imagem final - apenas runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiar apenas o JAR compilado
COPY --from=build /app/target/*.jar app.jar

# Expor porta
EXPOSE 8080

# Comando para rodar
ENTRYPOINT ["java", "-jar", "app.jar"]