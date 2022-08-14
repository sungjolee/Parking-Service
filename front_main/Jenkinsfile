stage('Webpack Build') {           
    steps {            
        script {
            try {
                sh "npm install"
                sh "npm run build"
                env.webpackBuildResult = true
                
            } catch(Exception e) {
                print(e)
                cleanWs()
                currentBuild.result = 'FAILURE'
            }
        }
    }
}
