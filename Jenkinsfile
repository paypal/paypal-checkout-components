pipeline {
    agent {
        label 'mesos'
    }
    stages {
        stage('Init') {
          steps {
            withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
              sh 'node -v'
              sh 'npm -v'

              sh 'npm set registry https://npm.paypal.com'
            }
          }
        }
        stage('Install') {
          steps {
            withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
              sh 'npm install'
            }
          }
        }
        stage('Lint') {
          steps {
            withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
              sh 'npm run lint'
            }
          }
        }
        stage('Test') {
            steps {
                withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
                  sh 'node -v'
                  sh 'npm rebuild'
                  sh 'npm test'
                }
            }
        }
        stage('Coverage') {
          steps {
            withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
              sh 'npm run cover'
            }
          }
        }
    }
}
