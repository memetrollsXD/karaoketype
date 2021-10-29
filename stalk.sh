sudo tail -f /var/log/nginx/access.log | grep --line-buffered "karaoketype" | grep -vwE  --line-buffered "83.128.194.156"
