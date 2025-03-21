# keycloak examples

See config file at /config folder

## Keycloak basic authz service with spring boot

### Step 1:

```bash
# Start keycloak container
docker compose up -d keycloak-rest-authz-resource-server
```

### Step 2:

```bash
# Start spring boot
./mvnw spring-boot:run -pl rest-authz-resource-server
```

There are two users:

| Username | Password | Role               |
|----------|----------|--------------------|
| alice    | alice    | user               |
| jdoe     | jdoe     | user, user_premium |

| endpoint           | Permission   |
|--------------------|--------------|
| /                  | user         |
| /protected/premium | user_premium |

### Test 1

```http request
GET http://localhost:8080
Authorization: Bearer ${alice_token}
```

The result should be : `Hello alice!`

### Test 2

```http request
GET http://localhost:8080/protected/premium
Authorization: Bearer ${alice_token}
```

The result should be : 403

### Test 3

```http request
GET http://localhost:8080/protected/premium
Authorization: Bearer ${jdoe_token}
```

The result should be : `Hello jdoe!`

## More details authz service with bank-rest-authz-resource-server

### Step 1:

```bash
# Start keycloak container
docker compose up -d keycloak-bank-rest-authz-resource-server
```

### Step 2:

```bash
# Start spring boot
./mvnw spring-boot:run -pl bank-rest-authz-resource-server
```

### Step 3:

Please visit Keycloak admin console `http://localhost:8180` with username|password `admin|admin`
and then create two users with following info.

| Username | Password | Role          |
|----------|----------|---------------|
| alice    | alice    | bank_teller   |
| bob      | bob      | account_owner |

This application is configured by `policy-enforcer.json` find more details
in [keycloak policy-enforcer](https://www.keycloak.org/securing-apps/policy-enforcer)

### Test

| Endpoint      | Methods    | Users     | Result |
|---------------|------------|-----------|--------|
| `/accounts/*` | `GET`      | bob/alice | permit |
| `/accounts/*` | `POST,PUT` | bob       | deny   |
| `/accounts/*` | `POST,PUT` | alice     | permit |

## Keycloak javascript adapter example
This example using:
- `react` with `vite` 
- `keycloak-js` library

You can find more details in [keycloak javascript-adapter](https://www.keycloak.org/securing-apps/javascript-adapter)

### Step 1
```bash
# Start keycloak container
docker compose up -d keycloak-javascript-adapter
```

### Step 2
run these commands

```bash
cd keycloak-javascript-adapter
```

```bash
npm i 
```
```bash
npm run dev 
```