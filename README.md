# Portfolio Site
This is my own personal [portfolio site](https://dennispham.me/). It shows off my projects, contributions, and explains a bit about myself.

The dynamic GitHub repository showcase is a great feature of this site, allowing me to add/remove repositories with a few clicks of some buttons using the Django administrator site. All repository details are updated hourly, with the newest information on stargazers, forks, the description, and main language used.

I know having a backend for a portfolio site is quite overkill, but I wanted to create a dynamic repository showcase, which requires a backend.

Here is the link to my portfolio site: [https://dennispham.me/](https://dennispham.me/)

## Development Setup
This project requires Python 3.8 and `pipenv` to be installed. To install pipenv, you can run the following command:
```
pip install pipenv
```

#### Environment Variables
Once you've done that, you can now setup this site. You will need to set some environment variables in a `.env` file:
```
SECRET_KEY=some_random_characters_here
DEBUG=true
GITHUB_OAUTH_TOKEN=your_token_here
```

To obtain a GitHub token for yourself, see [this article](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). Once this is done, make sure to place the `.env` file in the root of this repository.

#### Configuration
If you'd like to customize this for yourself, you need to change something in [portfolio/utils.py](portfolio/utils.py). Change the `GITHUB_API` variable to this:
```py
GITHUB_API = 'https://api.github.com/users/USERNAME/repos?per_page=100'
```
Make sure to replace `USERNAME` in the link with your own GitHub username.

#### Install Dependencies & Setup Database
Now, run these two commands below:
```
pipenv sync --dev
pipenv run manage migrate
```
This installs the needed dependencies and then sets up the database.

#### Start the Website
Alright! Now, you're ready to start the website.
```
pipenv run start
```

#### Add Repositories to Showcase
You may have noticed that there are no repositories on the homepage or projects page shown. This is because you need to add them via the Django admin site. The link to this would be [127.0.0.1/admin](127.0.0.1/admin).

On this page, you are greeted with a login form. You need to create a super user first, however, in order to log in. In the terminal, run this command:
```
pipenv run manage createsuperuser
```
Fill in the fields and you have created a super user account. You can now log in to the admin site.

Once you're logged in, click on `Repository metadatas` under the `Portfolio` section. Now on the top right, press `ADD REPOSITORY METADATA`. On this page, all you need to do is add the name of the repository, which would be formatted like so: `GITHUB_USERNAME/REPOSITORY_NAME`. Here's an example: `Den4200/pyfrost`. Then, scroll down and press the `SAVE` button. You can add more in a similar fashion.

Now, check out your homepage and projects page! The homepage will only show the first 6 repositories you add, but the projects page will show them all.

## Production Setup
For whatever reason, if you do want to setup and run this site in production, you will need to install `docker` and `docker-compose`, if you don't already have them. There are plenty of guides online on how to install them, if you don't know how.

#### Environment Variables
Once you have them installed, you will need to set some environment variables in a `.env` file:
```
SECRET_KEY=some_random_characters_here
DEBUG=false
GITHUB_OAUTH_TOKEN=your_token_here

POSTGRES_USER=some_user_here
POSTGRES_PASSWORD=some_password_here

POSTGRES_DB=some_user_here
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

EMAIL_USER=your_email_here
EMAIL_PASSWORD=your_password_here

ADMIN_NAME=your_name_here
ADMIN_EMAIL=your_email_here
```

To obtain a GitHub token for yourself, see [this article](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

`EMAIL_USER`, `EMAIL_PASSWORD`, `ADMIN_NAME`, and `ADMIN_EMAIL` are used to send emails to yourself when something goes wrong with the site. You will receive an email and be alerted when an error occurs.

*Note: `EMAIL_USER` must be a gmail account if you use the specified `EMAIL_HOST`!*

For the gmail account under `EMAIL_USER`, you must turn on less secure apps for it to be able to send emails. In your browser, make sure you're logged into that account and [press here](https://myaccount.google.com/lesssecureapps) and turn on that setting.

Once this is all done, make sure to place the `.env` file in the root of this repository.

#### Configuration
There will be a few files you need to edit, so it will work with your server and domain.

First, edit [scripts/nginx/nginx.conf](scripts/nginx/nginx.conf) and add your domain(s) to the `server_name` setting. Then place your SSL certificate `.pem` and `.key` files in the `/etc/ssl/` directory and update the `ssl_certificate` and `ssl_certificate_key` settings to have the correct paths.

Now onto [portfolio_site/settings.py](portfolio_site/settings.py). All you need to do here is add your domain(s) to `ALLOWED_HOSTS`.

Lastly, you need to change something in [portfolio/utils.py](portfolio/utils.py). Change the `GITHUB_API` variable to this:
```py
GITHUB_API = 'https://api.github.com/users/USERNAME/repos?per_page=100'
```
Make sure to replace `USERNAME` in the link with your own GitHub username.

Configuration is complete!

#### Run the Website
Now here is what you've been waiting for, starting up the site!
```
docker-compose up -d
```
This command will start up everything for you - uWSGI, the PostgreSQL database, and NGINX.

You can go to your domain, and wait a minute.. where's the CSS and animations and images? Don't worry! There's just two more commands to run.
```
docker-compose exec uwsgi python manage.py collectstatic
docker-compose restart
```
The first command will collect the static files (e.g. JS, CSS, and images) and place them in the `static` folder in the root directory of this repository. The second command will restart the docker containers, so now you should be all set! Have fun messing around with my portfolio site!

#### Add Repositories to Showcase
You may have noticed that there are no repositories on the homepage or projects page shown. This is because you need to add them via the Django admin site. The link to this would be `YOUR_DOMAIN/admin`.

On this page, you are greeted with a login form. You need to create a super user first, however, in order to log in. In the terminal, run this command:
```
docker-compose exec uwsgi python manage.py createsuperuser
```
Fill in the fields and you have created a super user account. You can now log in to the admin site.

Once you're logged in, click on `Repository metadatas` under the `Portfolio` section. Now on the top right, press `ADD REPOSITORY METADATA`. On this page, all you need to do is add the name of the repository, which would be formatted like so: `GITHUB_USERNAME/REPOSITORY_NAME`. Here's an example: `Den4200/pyfrost`. Then, scroll down and press the `SAVE` button. You can add more in a similar fashion.

Now, check out your homepage and projects page! The homepage will only show the first 6 repositories you add, but the projects page will show them all.

## Footnote
I hope you all like my portfolio site! Feel free to [contact me](https://dennispham.me/about/) via my socials if you have any questions.
