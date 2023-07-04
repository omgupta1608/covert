package main

type SubmitSecretBody struct {
	EncryptedSecret string `json:"encrypted_secret"`
	PassPhrase      string `json:"pass_phrase"`
}

type GetSecretBody struct {
	Key        string `json:"key"`
	PassPhrase string `json:"pass_phrase"`
}

type Secret struct {
	Id              string `json:"id"`
	EncryptedSecret string `json:"encrypted_secret"`
	PassPhrase      string `json:"pass_phrase"`
	IsOpened        bool   `json:"is_opened"`
}
