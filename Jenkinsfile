node('mesos') {
  checkout scm

  sh 'docker --version'

  stage 'Init'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'node -v'
    sh 'npm -v'
  }

  stage 'Install'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'npm set registry http://npm.paypal.com'
    sh 'npm install'
  }

  stage 'Lint'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'npm run lint'
  }

  stage 'Test'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'npm test'
  }

  stage 'Coverage'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'npm run cover'

    publishHTML(target: [
      allowMissing: false,
      alwaysLinkToLastBuild: false,
      keepAll: true,
      reportDir: 'coverage',
      reportFiles: 'index.html',
      reportName: "Coverage Report"
    ])
  }

  stage 'Build'
  withEnv(["PATH+NODE=${tool name: '4.8.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'}/bin"]) {
    sh 'npm run build'
  }

  sh 'echo "Done!"'
}
