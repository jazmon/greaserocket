#! /bin/bash
FILES=$(git status --porcelain | egrep "^(M|A).*.jsx?$" | sed -E "s/(M|A)  (.*)/\2/" | xargs)
if [[ -n "$FILES" ]]; then
  npm run test -- --findRelatedTests $FILES
else
  echo "No javascript files changed, skipping tests."
fi
