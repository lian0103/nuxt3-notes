---
tags: 學習
---

# Dockerfile & image & hub 

在docker hub建立自己的儲存空間(registry)。練習上傳(push)在本地出的映像檔(image)到自己的儲存空間下的儲存庫(repository)。


### step1 write a dockerfile
```shell
FROM node:12.22.1-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm","run","dev" ]

```
### step2 create a image

```shell
docker build -t node12-app .
```

### step3 run image
give args 
![](https://i.imgur.com/yoDqpCS.jpg)

open on localhost
![](https://i.imgur.com/4sWbwOy.jpg)

### step4 set image with tag

local image name : node12-app
my docker hub / repository name : jason0103/node12-app
version : 1

```shell

docker tag node12-app jason0103/node12-app:1

```

### step5

push the image to your registry of docker hub

```shell

docker push jason0103/node12-app:1

```