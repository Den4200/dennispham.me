from django.shortcuts import render
from django.views import View

from portfolio.utils import get_repo_data


class IndexView(View):
    template_name = 'portfolio/index.html'

    def get(self, request):
        repos = get_repo_data()
        return render(request, self.template_name, {'repos': repos})
