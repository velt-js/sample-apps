#!/usr/bin/env bash
set -euo pipefail

# Finds workspaces under apps/*/* that changed compared to the base of the PR
# or, on pushes to main, builds all apps.

# Collect all apps
mapfile -t ALL_APPS < <(find apps -maxdepth 2 -mindepth 2 -type d | sort)

# Default: build all apps on main
BRANCH="${GITHUB_REF_NAME:-}"
EVENT="${GITHUB_EVENT_NAME:-}"

if [[ "$EVENT" == "push" && "$BRANCH" == "main" ]]; then
  printf '[\n'
  for i in "${!ALL_APPS[@]}"; do
    printf '  "%s"%s\n' "${ALL_APPS[$i]}" $([ $i -lt $(( ${#ALL_APPS[@]} - 1 )) ] && echo "," )
  done
  printf ']\n'
  exit 0
fi

# For PRs / other branches, detect changed paths against the merge base with main
BASE_SHA="$(git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD main 2>/dev/null || true)"

if [[ -z "$BASE_SHA" ]]; then
  # Fallback: if we can't find a base, build all apps
  printf '[\n'
  for i in "${!ALL_APPS[@]}"; do
    printf '  "%s"%s\n' "${ALL_APPS[$i]}" $([ $i -lt $(( ${#ALL_APPS[@]} - 1 )) ] && echo "," )
  done
  printf ']\n'
  exit 0
fi

# Get changed files
mapfile -t CHANGED < <(git diff --name-only "$BASE_SHA"...HEAD)

# Build a set of changed app roots
declare -A CHANGED_APPS=()
for f in "${CHANGED[@]}"; do
  # match paths like apps/<category>/<demo>/...
  if [[ "$f" =~ ^apps/[^/]+/[^/]+/ ]]; then
    app_root="$(echo "$f" | awk -F/ '{print $1"/"$2"/"$3}')"
    CHANGED_APPS["$app_root"]=1
  fi
done

# If no app changed but tooling changed, build all (safe default on PRs that affect infra)
TOOLING_PATTERN='^(package.json|package-lock.json|turbo.json|.github/|scripts/)'
if [[ ${#CHANGED_APPS[@]} -eq 0 ]]; then
  if printf "%s\n" "${CHANGED[@]}" | grep -Eq "$TOOLING_PATTERN"; then
    for a in "${ALL_APPS[@]}"; do CHANGED_APPS["$a"]=1; done
  fi
fi

# Output JSON array for GitHub Actions matrix
idx=0
printf '[\n'
for a in "${!CHANGED_APPS[@]}"; do
  idx=$((idx+1))
  printf '  "%s"%s\n' "$a" $([ $idx -lt ${#CHANGED_APPS[@]} ] && echo "," )
done
printf ']\n'
