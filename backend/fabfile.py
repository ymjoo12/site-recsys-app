# from fabric import task
import datetime

from fabric.api import local

REPOSITORIES = {
    "prod": {
        "django": "site-recsys/django",
        "nginx": "site-recsys/nginx",
    },
}

def build(profile="default"):

    profileArg = ""
    if profile == "ym":
        profileArg = f"--profile site_recsys"

    account_id = local(
        f"aws sts get-caller-identity --output text --query 'Account' {profileArg}",
        capture=True,
    )
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

    # 로그인
    local(
        f"aws ecr get-login-password {profileArg} | "
        f"docker login --username AWS "
        f"--password-stdin {account_id}.dkr.ecr.ap-northeast-2.amazonaws.com/"
    )

    repo_url = f"{account_id}.dkr.ecr.ap-northeast-2.amazonaws.com/"

    # 레포지트리 URL를 구함
    repo_name = REPOSITORIES['prod']
    django_repo_url = f"{repo_url}{repo_name['django']}"
    nginx_repo_url = f"{repo_url}{repo_name['nginx']}"

    # 이미지 빌드
    local(f"docker-compose build")
    local(f"docker tag backend_django:latest {django_repo_url}:{timestamp}")
    local(f"docker tag backend_nginx:latest {nginx_repo_url}:{timestamp}")

    # 이미지를 ECR으로 푸쉬
    local(f"docker push {django_repo_url}:{timestamp}")
    local(f"docker push {nginx_repo_url}:{timestamp}")

    local(f"docker tag {django_repo_url}:{timestamp} {django_repo_url}:latest")
    local(f"docker tag {nginx_repo_url}:{timestamp} {nginx_repo_url}:latest")

    local(f"docker push {django_repo_url}:latest")
    local(f"docker push {nginx_repo_url}:latest")

    # create_service_command = (
    #     "aws ecs create-service --cluster {cluster} "
    #     "--service-name {service} --region ap-northeast-2"
    # )



