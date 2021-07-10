import compression from "compression"
import express from "express"
import * as path from "path"

const app = express()

app.use(compression())
app.use(express.static(path.resolve("./dist/ua-weather-angular")))
app.listen(process.env.PORT || 8080)



app.get("/*", (req, res) => {
  res.sendFile(
    path.join(
      path.resolve("./dist/ua-weather-angular/index.html")
    )
  )
})