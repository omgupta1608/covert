package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rs/xid"
)

var secrets map[string]Secret = make(map[string]Secret)

func setup() *gin.Engine {
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.POST("/submit-secret", func(ctx *gin.Context) {

		var Body SubmitSecretBody

		if ctx.ShouldBindJSON(&Body) != nil {
			// error
		}

		uniq := xid.New()

		secrets[uniq.String()] = Secret{
			Id:              uniq.String(),
			EncryptedSecret: Body.EncryptedSecret,
			PassPhrase:      Body.PassPhrase,
		}

		ctx.JSON(http.StatusAccepted, gin.H{
			"success": true,
			"message": "Secret saved",
			"data": map[string]string{
				"secret_id": uniq.String(),
			},
		})
	})
	return r
}

func main() {
	r := setup()

	r.Run(":4000")
}
