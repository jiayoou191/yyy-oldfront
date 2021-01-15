#!/bin/sh
cnpm install
npm run build

ssh ec2-user@101.132.149.31 "cd ~/front-end/ && rm -r dist/"

scp -r dist ec2-user@101.132.149.31:~/front-end/

ssh ec2-user@101.132.149.31 "kill $(lsof -t -i :3030)"

ssh ec2-user@101.132.149.31 "http-server ~/front-end/dist -U -p 3030 . > /dev/null 2>&1 &"
