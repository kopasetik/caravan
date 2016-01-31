#!/bin/bash

mongoimport -d expedia -c trips --file trips.json
mongoimport -d expedia -c users --file users.json
