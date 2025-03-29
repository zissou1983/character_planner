import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'

export default function App() {
  return (
    <Box minH="100vh" bg="gray.900" color="gray.100" p={8}>
      <VStack spacing={6} align="start">
        <Heading size="2xl" color="brand.400">
          Charakterplaner
        </Heading>
        <Text fontSize="lg" maxW="xl">
          Willkommen im epischen One D&D Charakter-Builder. Wähle eine Klasse, Lineage und lass uns die Legende deines Helden formen.
        </Text>
        <Button colorScheme="brand" size="lg">
          Charakter erstellen
        </Button>
      </VStack>
    </Box>
  )
}
