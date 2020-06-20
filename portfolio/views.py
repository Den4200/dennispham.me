from datetime import datetime, timezone

from django.shortcuts import render
from django.views import View
import requests

from portfolio.models import RepositoryMetadata


class IndexView(View):
    template_name = 'portfolio/index.html'

    github_api = "https://api.github.com/users/Den4200/repos?per_page=100"
    repository_cache_ttl = 3600

    def get(self, request):
        repos = self._get_repo_data()
        return render(request, self.template_name, {'repos': repos})

    def _update_repo_data(self):
        repos = RepositoryMetadata.objects.all()
        api_data = requests.get(self.github_api).json()

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

    def _get_repo_data(self):
        repos = RepositoryMetadata.objects.all()

        if not repos:
            return repos

        if any(
            (datetime.now(tz=timezone.utc) - repo.last_updated).seconds >= self.repository_cache_ttl
            for repo in repos
        ):
            self._update_repo_data()

        return repos
