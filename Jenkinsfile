pipeline {
    agent any
    environment {
        //docker config
        REGISTRY_URL = "docker-registry.metechvn.com/mkt_platform"
        IMAGE_NAME = "mkt-frontend"
        BUILD_VERSION = GIT_COMMIT.take(8)
      	APP_NAME = 'mkt-frontend'

        //notify config
        TELEBOT_TOKEN = credentials('telebot_token')
        TELEGROUP_ID = credentials('notify_telegroup_id')

        GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
        GIT_USERNAME = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
    }
    stages {
        stage('Build and push') {
            steps {
                echo "Building ${env.GIT_BRANCH}..."
                script{
                    dockerImage = docker.build("${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_VERSION}")
                    dockerImage.push()
                    dockerImage.push('latest')
                }
                echo 'Image is pushed!'
                sh 'docker image rm "${REGISTRY_URL}/${IMAGE_NAME}:${BUILD_VERSION}"'
                sh 'docker image rm "${REGISTRY_URL}/${IMAGE_NAME}:latest"'
                echo 'Local image is removed!'
            }
        }
        stage('Update Helm Value') {
            steps {
                echo "triggering update helm value ...."
                build job: 'mkt-argocd', parameters: [string(name: 'app_name', value: env.APP_NAME),string(name: 'image_tag', value: env.BUILD_VERSION),string(name: 'branch', value: env.GIT_BRANCH)]
            }
        }
    }
    post {
        success {
              sh 'sendTelegramMessage -t "$TELEBOT_TOKEN" -cid "$TELEGROUP_ID" -bs "success" -jn "$JOB_NAME" -bn "$BUILD_NUMBER" -bu "$BUILD_URL" -gu "$GIT_USERNAME" -gcm "$GIT_COMMIT_MSG \n\n\nImage: $IMAGE_NAME - version: $BUILD_VERSION đã build xong!!! ❤️ ❤️  "'
          }
        failure {
              sh 'sendTelegramMessage -t "$TELEBOT_TOKEN"  -cid "$TELEGROUP_ID" -bs "failed" -jn "$JOB_NAME" -bn "$BUILD_NUMBER" -bu "$BUILD_URL" -gu "$GIT_USERNAME" -gcm "$GIT_COMMIT_MSG \n\n\nImage: $IMAGE_NAME - version: $BUILD_VERSION đã build lỗi!!! 🥵 🥵"'
          }
    }
}
