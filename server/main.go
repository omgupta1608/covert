package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var secrets map[string]Secret = make(map[string]Secret)

func setup() *gin.Engine {
	// initialize firebase
	InitFirestore()

	r := gin.Default()

	// Ping test
	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.POST("/submit-secret", SubmitSecretHandler)

	r.POST("/secret", GetSecretHandler)

	return r
}

func main() {
	r := setup()

	r.Run(":8080")
}
