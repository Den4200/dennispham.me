target "docker-metadata-action" {}

target "default" {
  inherits = [ "docker-metadata-action" ]

  cache-to = [{ type = "inline" }]
  context = "."
  dockerfile = "Dockerfile"
}
