FROM nginx

# Copy nginx configuration template
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Use environment variables in nginx config
CMD /bin/sh -c "envsubst '\$AUTH_SERVICE_URL \$COURSE_SERVICE_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"

EXPOSE 80