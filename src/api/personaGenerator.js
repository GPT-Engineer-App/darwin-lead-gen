export const generatePersona = (icpData) => {
  // Mock implementation of persona generation based on ICP data
  return {
    name: "John Doe",
    age: 35,
    occupation: "Software Engineer",
    interests: ["Technology", "Gaming", "Reading"],
    goals: icpData.customerGoals,
    painPoints: icpData.customerPainPoints,
  };
};