import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import './assets/styles/styles.css'; 

export default function App() {
  return (
    <Box minH="100vh" bg="linear-gradient(to bottom, #2b6cb0, #2c5282)" color="white" p={8}>
      <VStack spacing={6} align="start">
        <Heading size="2xl" color="yellow.400">
          Charakterplaner
        </Heading>
        <Text fontSize="lg" maxW="xl">
          Willkommen im epischen One D&D Charakter-Builder. Wähle eine Klasse, Lineage und lass uns die Legende deines Helden formen.
        </Text>
        <Button colorScheme="yellow" size="lg" onClick={() => alert("Let's create a character!")}>
          Charakter erstellen
        </Button>
      </VStack>
    </Box>
  );
}