#!/bin/bash

# Vercel Ignore Build Script for Monorepo
# Returns exit code 0 to skip build, 1 to proceed with build
#
# Usage: ./scripts/ignore-build.sh <app-path>
# Example: ./scripts/ignore-build.sh apps/master-sample-app

APP_PATH=$1

if [ -z "$APP_PATH" ]; then
  echo "Error: No app path provided"
  echo "Usage: ./scripts/ignore-build.sh <app-path>"
  exit 1
fi

# Always build if no previous SHA (first deploy)
if [ -z "$VERCEL_GIT_PREVIOUS_SHA" ]; then
  echo "No previous deployment found. Proceeding with build..."
  exit 1
fi

echo "Checking for changes in: $APP_PATH"
echo "Comparing: $VERCEL_GIT_PREVIOUS_SHA -> $VERCEL_GIT_COMMIT_SHA"

# Check for changes in the app directory
APP_CHANGES=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA -- "$APP_PATH")

# Check for changes in shared files that should trigger all builds
SHARED_CHANGES=$(git diff --name-only $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA -- \
  "package.json" \
  "pnpm-lock.yaml" \
  "pnpm-workspace.yaml" \
  "turbo.json" \
  "tsconfig.base.json" \
  "velt-versions.json")

if [ -n "$APP_CHANGES" ]; then
  echo "Changes detected in $APP_PATH:"
  echo "$APP_CHANGES"
  echo "Proceeding with build..."
  exit 1
fi

if [ -n "$SHARED_CHANGES" ]; then
  echo "Changes detected in shared files:"
  echo "$SHARED_CHANGES"
  echo "Proceeding with build..."
  exit 1
fi

echo "No relevant changes detected. Skipping build."
exit 0
