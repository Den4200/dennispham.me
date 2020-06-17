from django.db import models


class Repository(models.Model):
    name = models.CharField(max_length=256)
    short_description = models.TextField(max_length=1024)
    long_description = models.TextField(max_length=4096)

    watchers = models.IntegerField()
    stargazers = models.IntegerField()
    forks = models.IntegerField()

    recorded_at = models.DateTimeField(auto_now=True)
