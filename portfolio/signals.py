from django.db.models.signals import post_save
from django.dispatch import receiver

from portfolio.models import RepositoryMetadata
from portfolio.utils import update_repo_data


@receiver(post_save, sender=RepositoryMetadata)
def update_repos(sender, instance, created, **kwargs):
    if created:
        update_repo_data()
