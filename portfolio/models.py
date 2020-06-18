from django.db import models


class RepositoryMetadata(models.Model):
    name = models.CharField(max_length=256)
    short_description = models.TextField(max_length=1024, blank=True, null=True)
    long_description = models.TextField(max_length=4096, blank=True, null=True)

    language = models.CharField(max_length=64, blank=True, null=True)

    stargazers = models.IntegerField(blank=True, null=True)
    forks = models.IntegerField(blank=True, null=True)

    last_updated = models.DateTimeField(auto_now=True)
