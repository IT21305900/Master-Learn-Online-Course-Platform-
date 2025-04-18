#!/bin/bash

# Set variables
RESOURCE_GROUP="lms-microservices"
ACR_NAME="masterlearnonline"
APP_SERVICE_PLAN="lms-service-plan"

# Get ACR credentials
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query username -o tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query passwords[0].value -o tsv)

# MongoDB connection string from arguments or environment variable
if [ -z "$MONGODB_CONNECTION_STRING" ]; then
  echo "ERROR: MongoDB connection string not provided. Set MONGODB_CONNECTION_STRING environment variable."
  exit 1
fi

# JWT Secret
if [ -z "$JWT_SECRET" ]; then
  JWT_SECRET="357c546c-d674-41b9-a5cd-a2bc2c9f5ac5"
fi

echo "Creating Web App for Auth Service..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-auth-service --deployment-container-image-name $ACR_NAME.azurecr.io/auth:latest
az webapp config container set --name lms-auth-service --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/auth:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-auth-service --settings DB_URL="$MONGODB_CONNECTION_STRING" JWT_SECRET="$JWT_SECRET" PORT=8001

echo "Creating Web App for Course Service..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-course-service --deployment-container-image-name $ACR_NAME.azurecr.io/course:latest
az webapp config container set --name lms-course-service --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/course:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-course-service --settings DB_URL="$MONGODB_CONNECTION_STRING" JWT_SECRET="$JWT_SECRET" PORT=8002

echo "Creating Web App for Lesson Service..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-lesson-service --deployment-container-image-name $ACR_NAME.azurecr.io/lesson:latest
az webapp config container set --name lms-lesson-service --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/lesson:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-lesson-service --settings DB_URL="$MONGODB_CONNECTION_STRING" JWT_SECRET="$JWT_SECRET" PORT=8003

echo "Creating Web App for Email Service..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-email-service --deployment-container-image-name $ACR_NAME.azurecr.io/email:latest
az webapp config container set --name lms-email-service --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/email:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-email-service --settings DB_URL="$MONGODB_CONNECTION_STRING" JWT_SECRET="$JWT_SECRET" PORT=8004

echo "Creating Web App for Enrollment Service..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-enroll-service --deployment-container-image-name $ACR_NAME.azurecr.io/enroll:latest
az webapp config container set --name lms-enroll-service --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/enroll:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-enroll-service --settings DB_URL="$MONGODB_CONNECTION_STRING" JWT_SECRET="$JWT_SECRET" PORT=8011

echo "Creating Web App for Nginx..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-nginx --deployment-container-image-name $ACR_NAME.azurecr.io/nginx:latest
az webapp config container set --name lms-nginx --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/nginx:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD

echo "Creating Web App for Frontend..."
az webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name lms-frontend --deployment-container-image-name $ACR_NAME.azurecr.io/web:latest
az webapp config container set --name lms-frontend --resource-group $RESOURCE_GROUP --docker-custom-image-name $ACR_NAME.azurecr.io/web:latest --docker-registry-server-url https://$ACR_NAME.azurecr.io --docker-registry-server-user $ACR_USERNAME --docker-registry-server-password $ACR_PASSWORD
az webapp config appsettings set --resource-group $RESOURCE_GROUP --name lms-frontend --settings VITE_API_URL=https://lms-nginx.azurewebsites.net

echo "All web apps created and configured successfully!"