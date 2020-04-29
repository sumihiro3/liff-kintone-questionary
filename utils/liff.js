const consola = require('consola')
const liffId = process.env.LIFF_ID

function getLineUserId() {
  return new Promise((resolve) => {
    consola.log('LIFF_ID', liffId)
    /* eslint no-undef: 0 */
    liff
      .init({ liffId })
      .then(async () => {
        consola.log('LIFF initialized!')
        const context = await liff.getContext()
        consola.info('LIFF Context', context)
        if (!context) {
          consola.warn('Could not get context. Need to login!')
          resolve(null)
        }
        const lineUserId = context.userId
        consola.info('LINE USER ID', lineUserId)
        resolve(lineUserId)
      })
      .catch((err) => {
        consola.warn('LIFF initialization failed', err)
        resolve(null)
      })
  })
}

export default getLineUserId
