#!/bin/bash
export PATH="$HOME/.nvm/versions/node/v22.17.1/bin:$PATH"
exec npx -y @adobe/aem-cli up --no-open --html-folder drafts
