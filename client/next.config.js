module.exports = {
  webpackDevMiddlewar: config => {
    config.watchOptions.poll = 300
    return config
  },
}
