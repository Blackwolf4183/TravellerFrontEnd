import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const colors = {
    primary:"#565387",
    primaryLight:"#7975bf",
    secondary:"rgba(103, 58, 217, 1)",
    footer:"#565387",
    footerLight:"#7975bf",
}

const fonts = {
    heading: "Mulish",
    body: "Mulish",
}

const myNewTheme = extendTheme({config,colors,fonts})

export default myNewTheme