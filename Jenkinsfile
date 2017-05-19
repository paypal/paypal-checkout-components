#!/usr/bin/env groovy

// Only re-build "master" every 4 hours, Monday through Friday
if (!env.CHANGE_ID && env.BRANCH_NAME == 'master') {
  properties([
    pipelineTriggers([
      cron('H */4 * * 1-5')
    ])
  ])
}

// Timeout build after 30 minutes
timeout(30) {
  node('mesos') {

    stage 'Clone'
    withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      checkout scm

      sh 'docker --version'
      sh 'node -v'
      sh 'npm -v'

      sh 'npm set registry https://npm.paypal.com'
    }

    stage 'Install'
    withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      sh 'npm install'
    }

    stage 'Lint'
    withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      sh 'npm run lint'
    }

    stage 'Test'
    withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      sh 'node -v'
      sh 'npm rebuild'
      sh 'npm test'
    }

    stage 'Coverage'
    withEnv(["PATH+NODE=${tool name: '4', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
      sh 'npm run cover'
    }
  }
}
