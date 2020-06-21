from datetime import datetime, timezone

from django.conf import settings
import requests

from portfolio.models import RepositoryMetadata


GITHUB_API = 'https://api.github.com/users/Den4200/repos?per_page=100'


def update_repo_data():
    repos = RepositoryMetadata.objects.all()
    api_data = requests.get(GITHUB_API).json()

    if isinstance(api_data, dict) and api_data.get('message').startswith('API rate limit exceeded'):
        return

    for repo_data in api_data:
        full_name = repo_data['full_name']

        try:
            repo = repos.get(name=full_name)

        except RepositoryMetadata.DoesNotExist:
            continue

        else:
            repo.short_description = repo_data['description']
            repo.language = repo_data['language']
            repo.forks = repo_data['forks_count']
            repo.stargazers = repo_data['stargazers_count']

            repo.save()


def get_repo_data():
    repos = RepositoryMetadata.objects.all()

    if not repos:
        return repos

    if any(
        (datetime.now(tz=timezone.utc) - repo.last_updated).seconds >= settings.REPOSITORY_CACHE_TTL
        for repo in repos
    ):
        update_repo_data()

    return repos
