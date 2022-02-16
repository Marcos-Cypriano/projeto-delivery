API > simple back-end for a delivery sistem
Lenguage > Typescript
DB > Local Postgresql estrutured with the tables: Clients, Deliveryman e Deliveries
ORM > Prisma
Routing > Express
Cryptography > bcrypt
Token > jsonwebtoken


Allows register client and deliveryman.
Authenticate clients allowing delivery order (item beeing just a text). 
Authenticate deliveryman allowing to take a delivery and update it with the date when he made the delivery.
All responses are in JSON.

Lembretes das contas cadastradas para testes:
Clients
    "username": "Marcos Cypriano",
	"password": "OwLoucoMeu!"


Deliverymans:
    "username": "Motoboy Marcos Cypriano",
	"password": "NaCorreria."

    "username": "João",
	"password": "1234"