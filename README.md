# covert
A secure way to communicate your secrets

## Working
- When a user saves a secret it is encrypted on the client side using a pass phrase encryption algo.
- A unique key (url in case of web clients) is generated for every stored secret.
- A user can then share this key (or url) to someone else, who can then retrieve the secret using the correct pass phrase
- The encrypted token is then fetched and decrypted using the pass phrase on the client and displayed to the user (only once)

## CLI Docs

### commands

```
covert new - save a new secret
```

```
covert get - get a saved secret
```
