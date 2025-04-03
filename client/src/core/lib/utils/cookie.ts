
/* 
  File to create functions to manage cookies.
*/

export const setCookie = ( // Function to set a cookie to the browser
  name: string,
  value: string,
  options: {
    days?: number
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: "strict" | "lax" | "none"
  } = {},
): void => {
  const { days = 7, path = "/", domain, secure, sameSite = "lax" } = options

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  cookieString += `; expires=${expires.toUTCString()}`
  cookieString += `; path=${path}`

  if (domain) {
    cookieString += `; domain=${domain}`
  }

  if (secure) {
    cookieString += "; secure"
  }

  cookieString += `; samesite=${sameSite}`

  document.cookie = cookieString
}


export const getCookie = (name: string): string | null => { // Function to get a cookie from the browser
  const nameEQ = encodeURIComponent(name) + "="
  const cookies = document.cookie.split(";")

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1)
    }

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

export const removeCookie = (name: string, options: { path?: string; domain?: string } = {}): void => {
  const { path = "/", domain } = options

  setCookie(name, "", {
    days: -1,
    path,
    domain,
  })
}

