#!/bin/bash

# MoyPay Frontend Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
IMAGE_NAME="moypay-frontend"
IMAGE_TAG=${2:-latest}

echo -e "${GREEN}🚀 Starting deployment for ${ENVIRONMENT} environment${NC}"

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}❌ Invalid environment. Use 'staging' or 'production'${NC}"
    exit 1
fi

# Build Docker image
echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .

# Tag image for environment
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${ENVIRONMENT}

# Run health check
echo -e "${YELLOW}🔍 Running health checks...${NC}"
docker run --rm -d --name temp-health-check -p 3003:3002 ${IMAGE_NAME}:${IMAGE_TAG}

# Wait for the app to start
sleep 10

# Check if the app is responding
if curl -f http://localhost:3003 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
    docker stop temp-health-check || true
    exit 1
fi

# Clean up health check container
docker stop temp-health-check

echo -e "${GREEN}🎉 Deployment preparation completed successfully!${NC}"

if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${YELLOW}⚠️  Production deployment requires manual approval${NC}"
    echo -e "${YELLOW}   Run: docker-compose up -d to deploy${NC}"
else
    echo -e "${GREEN}🚀 Starting staging deployment...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✅ Staging deployment completed!${NC}"
fi
