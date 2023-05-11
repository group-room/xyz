FROM azul/zulu-openjdk:11
WORKDIR /spring
COPY ./build/libs/WebSocketAndKafka-0.0.1-SNAPSHOT server.jar
ENTRYPOINT ["java", "-jar", "server.jar"]
