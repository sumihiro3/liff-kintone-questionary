FROM gitpod/workspace-full

# USER root
USER gitpod
# Setup Heroku CLI
RUN wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
