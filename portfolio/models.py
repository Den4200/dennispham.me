from django.db import models


class RepositoryMetadata(models.Model):
    name = models.CharField(max_length=256)
    short_description = models.TextField(max_length=1024)
    long_description = models.TextField(max_length=4096)

    language = models.CharField(max_length=64)

    watchers = models.IntegerField()
    stargazers = models.IntegerField()
    forks = models.IntegerField()

    last_updated = models.DateTimeField(auto_now=True)
