import { ChakraProvider } from '@chakra-ui/react'
import { PlayVideo } from '../../Components/playVideo'

export function Home() {
  return (
    <ChakraProvider>
      <PlayVideo />
    </ChakraProvider>
  )
}
