const execa = require('execa')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Pushing version ${pluginConfig.name}:${version} to docker hub`)

  // Push both new version and latest
  await execa('docker', ['tag', `${pluginConfig.name}:latest`, `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  await execa('docker', ['push', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  await execa('docker', ['push', `${pluginConfig.name}:latest`], { stdio: 'inherit' })
}
