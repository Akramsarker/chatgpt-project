export default function ({ store, redirect, route }) {
  const action = route.query.mode
  const continueUrl = route.query.continueUrl
  let query = route.fullPath
  query = query.replace('/auth', '')
  if (action === 'signIn') {
    location.replace(continueUrl + '/signin' + query)
  } else if (action === 'resetPassword') {
    location.replace(continueUrl + '/new-password' + query)
  }
}
