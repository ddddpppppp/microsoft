#!/usr/bin/env bash
set -euo pipefail

# ===== Config (can be overridden by environment variables) =====
REPO_DIR="${REPO_DIR:-/www/wwwroot/apps-microsoft.net/.deploy-repo}"
TARGET_DIR="${TARGET_DIR:-/www/wwwroot/apps-microsoft.net}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-master}"
LOG_FILE="${LOG_FILE:-/tmp/microsoft-webhook-deploy.log}"
LOCK_FILE="${LOCK_FILE:-/tmp/microsoft-webhook-deploy.lock}"

{
  echo "========== $(date '+%Y-%m-%d %H:%M:%S') =========="
  echo "[INFO] Start deploy. branch=${DEPLOY_BRANCH}"

  if [[ ! -d "${REPO_DIR}/.git" ]]; then
    echo "[ERROR] REPO_DIR is not a git repository: ${REPO_DIR}"
    exit 1
  fi

  mkdir -p "${TARGET_DIR}"
  mkdir -p "${TARGET_DIR}/app" "${TARGET_DIR}/public" "${TARGET_DIR}/scripts"

  exec 9>"${LOCK_FILE}"
  if ! flock -n 9; then
    echo "[INFO] Another deployment is running, skip."
    exit 0
  fi

  cd "${REPO_DIR}"
  echo "[INFO] Fetch latest from origin..."
  git fetch origin "${DEPLOY_BRANCH}"
  git checkout "${DEPLOY_BRANCH}"
  git pull --ff-only origin "${DEPLOY_BRANCH}"

  echo "[INFO] Copy files to target..."
  rsync -a "${REPO_DIR}/app/" "${TARGET_DIR}/app/"
  rsync -a "${REPO_DIR}/config/" "${TARGET_DIR}/config/"
  rsync -a "${REPO_DIR}/public/" "${TARGET_DIR}/public/"
  rsync -a "${REPO_DIR}/scripts/" "${TARGET_DIR}/scripts/"
  rsync -a "${REPO_DIR}/index.php" "${TARGET_DIR}/index.php"
  rsync -a "${REPO_DIR}/composer.json" "${TARGET_DIR}/composer.json"
  [[ -f "${REPO_DIR}/composer.lock" ]] && rsync -a "${REPO_DIR}/composer.lock" "${TARGET_DIR}/composer.lock"

  echo "[INFO] Running composer install..."
  cd "${TARGET_DIR}"
  composer install --no-dev --optimize-autoloader --no-interaction 2>&1

  echo "[INFO] Deploy done."
} >> "${LOG_FILE}" 2>&1
