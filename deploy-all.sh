#!/usr/bin/env bash

# Deploy Home
./deploy-html.sh home
./deploy-css.sh home
./deploy-js.sh home

# Deploy Host Home
./deploy-html.sh host_home
./deploy-css.sh host_home
./deploy-js.sh host_home

# Deploy Parking Home
./deploy-html.sh parking_home
./deploy-css.sh parking_home

# Deploy Static Pages
./deploy-html.sh static_pages
./deploy-css.sh static_pages
./deploy-js.sh static_pages

# Deploy Get Space
./deploy-html.sh get_space 
./deploy-css.sh get_space
./deploy-js.sh get_space
./deploy-test.sh get_space

# Deploy Manage Listing
./deploy-html.sh manage_listing
./deploy-css.sh manage_listing
./deploy-js.sh manage_listing
#./deploy-test.sh manage_listing

# Deploy Booking
./deploy-html.sh booking
./deploy-css.sh booking
./deploy-js.sh booking
./deploy-test.sh booking

