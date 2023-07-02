package main

type SubmitSecretBody struct {
	EncryptedSecret string
	PassPhrase      string
}

type Secret struct {
	Id              string
	EncryptedSecret string
	PassPhrase      string
}
