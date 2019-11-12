#!/bin/bash
#docker run  -v $(pwd):/usr/src/app/ -it --rm my-blog-web bundle install
docker build -t my-blog-web -f Dockerfile .
docker tag my-blog alen9968/my-blog-web
if [ "$1" = "push" ]; then
  docker push alen9968/my-blog-web
fi
