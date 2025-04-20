#!/bin/bash
# Azure infrastructure setup for Master Learn platform

# Variables (replace with your actual values as needed)
RESOURCE_GROUP="master-learn-rg"
LOCATION="eastus"
ACR_NAME="masterlearnacr$(date +%s | tail -c 6)"  # Unique name
CONTAINERAPPS_ENV="master-learn-env"
LOG_ANALYTICS="master-learn-logs"
KEY_VAULT_NAME="master-learn-kv$(date +%s | tail -c 6)"  # Unique name

# MongoDB Atlas connection string - make a dummy placeholder for now
MONGODB_URI="mongodb+srv://placeholder:placeholder@placeholder.mongodb.net/placeholder"

# JWT Secret - generate a secure random string
JWT_SECRET=$(openssl rand -base64 32)

# Step 1: Create Resource Group
echo "Creating Resource Group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Step 2: Create Azure Container Registry
echo "Creating Azure Container Registry..."
az acr create --resource-group $RESOURCE_GROUP --name $ACR_NAME --sku Basic
az acr update --name $ACR_NAME --admin-enabled true

# Get ACR credentials
ACR_USERNAME=$(az acr credential show --name $ACR_NAME --query "username" -o tsv)
ACR_PASSWORD=$(az acr credential show --name $ACR_NAME --query "passwords[0].value" -o tsv)
ACR_LOGIN_SERVER=$(az acr show --name $ACR_NAME --query "loginServer" -o tsv)

echo "ACR Username: $ACR_USERNAME"
echo "ACR Password: $ACR_PASSWORD"
echo "ACR Login Server: $ACR_LOGIN_SERVER"

# Step 3: Create Key Vault
echo "Creating Azure Key Vault..."
az keyvault create --name $KEY_VAULT_NAME --resource-group $RESOURCE_GROUP --location $LOCATION

# Add secrets to Key Vault
echo "Adding secrets to Key Vault..."
az keyvault secret set --vault-name $KEY_VAULT_NAME --name "mongodb-uri" --value "$MONGODB_URI"
az keyvault secret set --vault-name $KEY_VAULT_NAME --name "jwt-secret" --value "$JWT_SECRET"

# Step 4: Create Log Analytics Workspace
echo "Creating Log Analytics workspace..."
az monitor log-analytics workspace create \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_ANALYTICS

LOG_ANALYTICS_ID=$(az monitor log-analytics workspace show \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_ANALYTICS \
  --query customerId -o tsv)

LOG_ANALYTICS_KEY=$(az monitor log-analytics workspace get-shared-keys \
  --resource-group $RESOURCE_GROUP \
  --workspace-name $LOG_ANALYTICS \
  --query primarySharedKey -o tsv)

# Step 5: Create Container Apps Environment
echo "Creating Container Apps Environment..."
az containerapp env create \
  --name $CONTAINERAPPS_ENV \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --logs-workspace-id $LOG_ANALYTICS_ID \
  --logs-workspace-key $LOG_ANALYTICS_KEY

# Step 6: Assign managed identity for Container Apps to access Key Vault
echo "Creating managed identity for Container Apps..."
SYSTEM_IDENTITY=$(az identity create --name containerapp-identity --resource-group $RESOURCE_GROUP --query id -o tsv)

# Set policy to allow managed identity to read secrets from Key Vault
echo "Setting Key Vault access policy for managed identity..."
az keyvault set-policy --name $KEY_VAULT_NAME \
  --resource-group $RESOURCE_GROUP \
  --object-id $(az identity show --name containerapp-identity --resource-group $RESOURCE_GROUP --query principalId -o tsv) \
  --secret-permissions get list

# Step 7: Create Container Apps with references to Key Vault secrets

# Auth Service
echo "Creating Auth Service Container App..."
az containerapp create \
  --name auth-service \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINERAPPS_ENV \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 8001 \
  --ingress internal \
  --min-replicas 1 \
  --max-replicas 3 \
  --user-assigned $SYSTEM_IDENTITY \
  --secrets "mongodb-uri=keyvault:https://$KEY_VAULT_NAME.vault.azure.net/secrets/mongodb-uri" \
             "jwt-secret=keyvault:https://$KEY_VAULT_NAME.vault.azure.net/secrets/jwt-secret" \
  --env-vars "PORT=8001" \
             "MONGODB_URI=secretref:mongodb-uri" \
             "JWT_SECRET=secretref:jwt-secret"

# Course Service
echo "Creating Course Service Container App..."
az containerapp create \
  --name course-service \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINERAPPS_ENV \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 8002 \
  --ingress internal \
  --min-replicas 1 \
  --max-replicas 3 \
  --user-assigned $SYSTEM_IDENTITY \
  --secrets "mongodb-uri=keyvault:https://$KEY_VAULT_NAME.vault.azure.net/secrets/mongodb-uri" \
             "jwt-secret=keyvault:https://$KEY_VAULT_NAME.vault.azure.net/secrets/jwt-secret" \
  --env-vars "PORT=8002" \
             "MONGODB_URI=secretref:mongodb-uri" \
             "JWT_SECRET=secretref:jwt-secret"

# Get Container App endpoints for Nginx configuration
AUTH_SERVICE_URL="https://auth-service"
COURSE_SERVICE_URL="https://course-service"

# Nginx Service
echo "Creating Nginx Service Container App..."
az containerapp create \
  --name nginx-service \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINERAPPS_ENV \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3 \
  --env-vars "AUTH_SERVICE_URL=$AUTH_SERVICE_URL" \
             "COURSE_SERVICE_URL=$COURSE_SERVICE_URL"

# Step 8: Create service principal for GitHub Actions
echo "Creating service principal for GitHub Actions..."
SP_JSON=$(az ad sp create-for-rbac \
  --name "github-actions-master-learn" \
  --role contributor \
  --scopes /subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP \
  --sdk-auth)

echo ""
echo "Azure setup complete!"
echo ""
echo "IMPORTANT: Save the following information for GitHub secrets:"
echo "---------------------------------------------------------"
echo "AZURE_CREDENTIALS: $SP_JSON"
echo ""
echo "ACR_LOGIN_SERVER: $ACR_LOGIN_SERVER"
echo "ACR_USERNAME: $ACR_USERNAME"
echo "ACR_PASSWORD: $ACR_PASSWORD"
echo "AZURE_RESOURCE_GROUP: $RESOURCE_GROUP"
echo "KEY_VAULT_NAME: $KEY_VAULT_NAME"
echo ""
echo "For MongoDB Atlas, update the secret in Key Vault with your actual connection string:"
echo "az keyvault secret set --vault-name $KEY_VAULT_NAME --name mongodb-uri --value 'your-actual-connection-string'"