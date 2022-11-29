FROM gradle:7.5.1-jdk17-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build -x test --no-daemon

FROM openjdk:15.0.2-jdk

USER root
RUN  \
    mkdir $JAVA_HOME/jre/ && \
    mkdir $JAVA_HOME/jre/lib && \
    mkdir $JAVA_HOME/jre/lib/security
COPY /cert/okteto.crt $JAVA_HOME/jre/lib/security
COPY /cert/keycloak.crt $JAVA_HOME/jre/lib/security
RUN cd $JAVA_HOME/jre/lib/security && \
    keytool -keystore cacerts -storepass changeit -noprompt -trustcacerts -importcert -alias oktetocert -file okteto.crt && \
    keytool -keystore cacerts -storepass changeit -noprompt -trustcacerts -importcert -alias keycloakcert -file keycloak.crt

ENV spring_profiles_active=dev
RUN mkdir /app
COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
ENTRYPOINT ["java", "-jar" ,"/app/spring-boot-application.jar"]