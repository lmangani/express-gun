# ExpressJS App with GunDB

Simple express application which exposes itself as a GunDB peer whilst also including a bunch of RESTful API endpoints.

## Examples

### STORE
##### POST
```
curl-X POST -H "Content-type: application/json" \
-d '{"test":"5555"}' http://127.0.0.1:3000/api/set/new
```
##### GET
```
curl 127.0.0.1:3000/api/set/new/name/bingo
```
### RETRIEVE

##### GET
###### Object
```
curl 127.0.0.1:3000/api/get/new
```
##### GET 
###### Key
```
curl 127.0.0.1:3000/api/get/new/name
```
### DELETE
#### GET
```
curl 127.0.0.1:3000/api/unset/new
```
