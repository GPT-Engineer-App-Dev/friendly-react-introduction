import { Container, Text, VStack, Button, Box, Flex, Heading, Avatar, HStack, Badge, Input, Select, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaCalendarAlt, FaUserPlus, FaLock } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="background.800">
      <Box width="100%" p={4} bg="background.900" boxShadow="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg" color="text.100">atics</Heading>
          <HStack spacing={4}>
            <Button as={Link} to="/" variant="link" color="text.100">Home</Button>
            <Button as={Link} to="/clients" variant="link" color="text.100">Clients</Button>
            <Button as={Link} to="/analytics" variant="link" color="text.100">Analytics</Button>
            <Button as={Link} to="/marketing" variant="link" color="text.100">Marketing</Button>
            <Button as={Link} to="/reports" variant="link" color="text.100">Reports</Button>
            <Button as={Link} to="/upgrade" bg="accent.yellow">Upgrade</Button>
            <Avatar name="User" src="https://bit.ly/broken-link" />
          </HStack>
        </Flex>
      </Box>
      <Box width="100%" p={4} bg="background.900" boxShadow="md" mt={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.100">Adobe Analytics</Heading>
          <HStack spacing={4}>
            <IconButton icon={<FaSearch />} aria-label="Search" />
            <Input placeholder="Find anything" />
          </HStack>
        </Flex>
        <Text color="text.200" mt={2}>Adobe Analytics helps you create a holistic view of your business by turning customer interactions into actionable insights</Text>
        <HStack spacing={4} mt={4}>
          <Avatar name="Kyle O." src="https://bit.ly/broken-link" />
          <Avatar name="Jannies P." src="https://bit.ly/broken-link" />
        </HStack>
      </Box>
      <Box width="100%" p={4} bg="background.900" boxShadow="md" mt={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.100">Departments</Heading>
          <HStack spacing={4}>
            <Button variant="outline">All</Button>
            <Button variant="outline">USA</Button>
            <Button variant="outline">Europe</Button>
            <IconButton icon={<FaCalendarAlt />} aria-label="Calendar" />
            <IconButton icon={<FaFilter />} aria-label="Filter" />
          </HStack>
        </Flex>
        <Box mt={4}>
          <Flex justifyContent="space-between" alignItems="center" p={4} bg="background.800" boxShadow="md">
            <Text color="text.100">QA</Text>
            <Text color="text.200">India</Text>
            <Text color="text.100">4,000</Text>
            <Text color="text.200">Sep 23, 2022</Text>
            <Badge colorScheme="green">Success</Badge>
            <Text color="text.200">Jane Cooper</Text>
            <Button variant="link">More</Button>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" p={4} bg="background.800" boxShadow="md" mt={2}>
            <Text color="text.100">Development</Text>
            <Text color="text.200">The Netherlands</Text>
            <Text color="text.100">8,000</Text>
            <Text color="text.200">Dec 25, 2022</Text>
            <Badge colorScheme="blue">Processing</Badge>
            <Text color="text.200">Jenny Wilson</Text>
            <Button variant="link">Less</Button>
          </Flex>
        </Box>
      </Box>
      <Box width="100%" p={4} bg="background.900" boxShadow="md" mt={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" color="text.100">Members</Heading>
          <Button leftIcon={<FaUserPlus />} bg="accent.yellow">Invite</Button>
        </Flex>
        <HStack spacing={4} mt={4}>
          <Avatar name="HS" src="https://bit.ly/broken-link" />
          <Avatar name="PA" src="https://bit.ly/broken-link" />
          <Avatar name="AS" src="https://bit.ly/broken-link" />
          <Avatar name="LO" src="https://bit.ly/broken-link" />
          <Avatar name="DV" src="https://bit.ly/broken-link" />
        </HStack>
        <HStack spacing={4} mt={4}>
          <Button leftIcon={<FaLock />} bg="accent.orange">Private</Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default Index;