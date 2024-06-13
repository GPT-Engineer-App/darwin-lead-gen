import { Container, VStack, Heading, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [icpData, setIcpData] = useState({
    companyName: "",
    industry: "",
    customerPainPoints: "",
    customerGoals: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIcpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ICP Data Submitted:", icpData);
    // Here you can add the logic to send the data to the backend or perform any other actions
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
            <Button type="submit" colorScheme="blue" size="lg" width="100%">
              Submit
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Index;