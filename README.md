# What is this?

Base template for a Node.js app that runs everything through Docker.

Depends only on Docker and Bash.

## Quick Start

### Create a new base to your current directory

NOTE: this will download a bunch of files to your current directory, so make sure the directory is empty before doing this:

```sh
mkdir -p s_base/s_node_2nd && wget https://github.com/saavuio/s_node_2nd/raw/v2/init.sh -P s_base/s_node_2nd && chmod +x ./s_base/s_node_2nd/init.sh && ./s_base/s_node_2nd/init.sh
```

### Start a development server

When the build is done, run it with:

```sh
./scripts/dev.sh
```

