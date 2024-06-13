import { Container, VStack, Heading, FormControl, FormLabel, Input, Textarea, Button, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Index = () => {
  const [icpData, setIcpData] = useState({
    companyName: "",
    industry: "",
    customerPainPoints: "",
    customerGoals: "",
  });

  const [buyerPersona, setBuyerPersona] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIcpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Save ICP data
      await axios.post("/api/save-icp", icpData);

      // Generate buyer persona
      const response = await axios.post("/api/generate-buyer-persona", icpData);
      setBuyerPersona(response.data);

      // Save buyer persona
      await axios.post("/api/save-buyer-persona", response.data);

      // Attach buyer persona to campaign (assuming campaignId is available)
      const campaignId = "some-campaign-id"; // Replace with actual campaign ID
      await axios.post("/api/attach-persona-to-campaign", { campaignId, buyerPersona: response.data });

      // Call new API endpoint
      await axios.post("/api/new-endpoint", { campaignId, buyerPersona: response.data });
    } catch (err) {
      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>
          Teach Darwin About Your Ideal Customer Profile (ICP)
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <VStack spacing={4}>
            <FormControl id="companyName" isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input name="companyName" value={icpData.companyName} onChange={handleChange} placeholder="Enter your company name" />
            </FormControl>
            <FormControl id="industry" isRequired>
              <FormLabel>Industry</FormLabel>
              <Input name="industry" value={icpData.industry} onChange={handleChange} placeholder="Enter your industry" />
            </FormControl>
            <FormControl id="customerPainPoints" isRequired>
              <FormLabel>Customer Pain Points</FormLabel>
              <Textarea name="customerPainPoints" value={icpData.customerPainPoints} onChange={handleChange} placeholder="Describe your customer's pain points" />
            </FormControl>
            <FormControl id="customerGoals" isRequired>
              <FormLabel>Customer Goals</FormLabel>
              <Textarea name="customerGoals" value={icpData.customerGoals} onChange={handleChange} placeholder="Describe your customer's goals" />
            </FormControl>
            <Button type="submit" colorScheme="blue" size="lg" width="100%" isLoading={loading}>
              Submit
            </Button>
          </VStack>
        </form>
        {error && (
          <Box mt={4} p={4} bg="red.100" borderRadius="md">
            <Text color="red.800">{error}</Text>
          </Box>
        )}
        {buyerPersona && (
          <Box mt={4} p={4} bg="green.100" borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>
              Generated Buyer Persona
            </Heading>
            <Text>{JSON.stringify(buyerPersona, null, 2)}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;