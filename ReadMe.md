## Follow below commands to run this project
# BUILD database and containers

#while in root directory of the project run

```bash
docker compose up -d
```

#To run below commands you need to be inside the api containers shell
# RUN MIGRATION

```bash
npm run migrate
```


# SEED DATA

```bash
npm run seed
```

# At this point you're ready to test the elevator api
# You can visit below urls on your browser to test the api

# To view elevator info visit the link below
http://localhost:2020/api/elevators/info


# To request an elevator visit the link below
http://localhost:2020/api/elevators/request?requestFloor=2&targetFloor=4

# play around with different values on the requestFloor and targetFloor to experiment;

# You can also run the latter request on different browsers to see different elevators move concurrently

# TESTS

```bash
npm run test
```
