docker run -p 8080:8080 -v $(pwd)/swagger.yaml:/usr/share/nginx/html/swagger.yaml -e "API_URL=swagger.yaml" swaggerapi/swagger-ui
