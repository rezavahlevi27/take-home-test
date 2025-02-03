pipeline {
    agent any
 
    tools {
        nodejs 'NodeJS'
    }
 
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/rezavahlevi27/take-home-test.git'
            }
        }
 
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
 
        stage('Update Dependencies') {
            steps {
                script {
                    sh 'npm update'
                }
            }
        }
 
        stage('Run Jest Tests') {
            steps {
                script {
                    sh 'npm test --ci'
                }
            }
        }
 
        stage('Archive Test Results') {
            steps {
                script{
                    junit '**/test-reports/*.xml'
                }
            }
        }
    }
 
    post {
        always {
            cleanWs()
        }
    }
}