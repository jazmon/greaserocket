#! /bin/bash
npm run test:precommit $(git status --porcelain | egrep "^(M|A).*.jsx?$" | sed -E "s/(M|A)  (.*)/\2/" | xargs)
