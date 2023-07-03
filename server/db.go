package main

import (
	"context"
	"path/filepath"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"
	"google.golang.org/api/option"
)

var FirebaseDBClient *db.Client
var FirebaseCtx context.Context

func InitFirestore() {
	FirebaseCtx = context.Background()
	serviceAccountKeyPath, _ := filepath.Abs("./serviceAccountKey.json")
	sa := option.WithCredentialsFile(serviceAccountKeyPath)

	conf := &firebase.Config{
		DatabaseURL: "https://covert-ots-default-rtdb.firebaseio.com/",
	}

	app, err := firebase.NewApp(FirebaseCtx, conf, sa)

	if err != nil {
		panic(err)
	}

	FirebaseDBClient, err = app.Database(FirebaseCtx)

	if err != nil {
		panic(err)
	}
}
