const fs = require('fs')

class Config {
  constructor () {
    this.configFiles = {
      tsConfig: this.getConfigFile('tsconfig.json'),
      nuxtConfig: this.getConfigFile('nuxt.config.js'),
      vueConfig: this.getConfigFile('vue.config.js')
    }
  }

  getConfigFile (file) {
    try {
      return  require(`../${file}`)
    } catch (error) {
      return undefined
    }
  }

  isTS () {
    return Boolean(this.configFiles.tsConfig)
  }
  isTSClass () {
    return this.isTS() &&
      this.configFiles.tsConfig &&
      this.configFiles.tsConfig.compilerOptions &&
      this.configFiles.tsConfig.compilerOptions.experimentalDecorators
  }
  isNuxt () {
    return Boolean(this.configFiles.nuxtConfig)
  }
  isVueCli () {
    return Boolean(this.configFiles.vueConfig)
  }

  usesVuex () {
    return fs.existsSync(`${this.getSrcDir()}store`)
  }

  getSrcDir = () => {
    if (this.isNuxt && this.configFiles.nuxtConfig && this.configFiles.nuxtConfig.srcDir) {
      return this.configFiles.nuxtConfig.srcDir
    } else if (this.isNuxt && this.configFiles.nuxtConfig && !this.configFiles.nuxtConfig.srcDir) {
      return ''
    } else {
      return 'src/'
    }
  }

  getConfig () {
    return {
      configFiles: this.configFiles,
      isNuxt: this.isNuxt(),
      isVueCli: this.isVueCli(),
      isTS: this.isTS(),
      isTSClass: this.isTSClass(),
      usesVuex: this.usesVuex(),
      srcDir: this.getSrcDir()
    }
  }
}

module.exports = new Config()
