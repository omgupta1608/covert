package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

func SubmitSecretHandler(ctx *gin.Context) {

	var Body SubmitSecretBody

	if err := ctx.ShouldBindJSON(&Body); err != nil {
		log.Fatal(err)
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Something went wrong",
			"data":    nil,
		})
	}

	uniq := xid.New()

	newSecret := Secret{
		Id:              uniq.String(),
		EncryptedSecret: Body.EncryptedSecret,
		PassPhrase:      Body.PassPhrase,
		IsOpened:        false,
	}

	secret_ref := FirebaseDBClient.NewRef("secrets/" + uniq.String())

	if err := secret_ref.Set(FirebaseCtx, newSecret); err != nil {
		log.Fatal(err)
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Something went wrong",
			"data":    nil,
		})
	}

	ctx.JSON(http.StatusAccepted, gin.H{
		"success": true,
		"message": "Secret saved",
		"data": map[string]string{
			"secret_id": uniq.String(),
		},
	})
}

func GetSecretHandler(ctx *gin.Context) {
	var Body GetSecretBody

	if err := ctx.ShouldBindJSON(&Body); err != nil {
		log.Fatal(err)
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Something went wrong",
			"data":    nil,
		})
	}

	var secret Secret

	secret_ref := FirebaseDBClient.NewRef("secrets/" + Body.Key)

	if err := secret_ref.Get(FirebaseCtx, &secret); err != nil {
		log.Fatal(err)
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Something went wrong",
			"data":    nil,
		})
	}

	if secret.IsOpened {
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Secret already opened. Cannot view again",
			"data":    nil,
		})
		return
	}

	if secret.PassPhrase != Body.PassPhrase {
		ctx.JSON(http.StatusAccepted, gin.H{
			"success": false,
			"message": "Incorrect passphrase",
			"data":    nil,
		})
		return
	}

	//TODO: update secret (is_opened=true) before sending response

	ctx.JSON(http.StatusAccepted, gin.H{
		"success": true,
		"message": "Secret Retrieved",
		"data":    secret,
	})

}
