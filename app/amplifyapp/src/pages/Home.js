import {
	Card,
	Image,
	View,
	Heading,
	Flex,
	Badge,
	Text,
	Button,
	useTheme,
  } from '@aws-amplify/ui-react';
  import { Divider } from '@aws-amplify/ui-react';
  import videoBG2 from '../assets/videoBG2.mp4';
  import {motion} from "framer-motion";


  export const Home = () => {
	const { tokens } = useTheme();
	return (
		<div>
			<div className = "wrapper">
			<div className = "overlay"></div>
			<video src = {videoBG2} autoPlay loop muted width = "100%"/>
			<div className = "content">
				<h1>blur</h1>
				<h2>Asynchronous, secure, and efficient communication</h2>
			</div>
			</div>
			<motion.div
				initial = {{opacity: 0}}
				whileInView = {{opacity:1}}
				exit = {{opacity: 0}}
				viewport={{amount: 0.8, once: false}}
			>
		<Flex alignItems = 'center' direction = 'row' justifyContent = 'center' wrap = "wrap" margin = '1rem 0rem 1rem 0rem'>
			<View padding={tokens.space.medium}>
				<Card width = '20rem' height = '12rem' border-top = '1px'>
				<Flex direction="column" alignItems="flex-start"  textAlign="left">
				<Divider/>
						<Heading level={5}>
							User-friendly
						</Heading>
						<Text as="span">
						The software doesn't require your clients to create an account or login, making it easy
						access for everyone regardless of their technology experience.
						</Text>
					</Flex>
				</Card>
			</View>
			<View
				padding={tokens.space.medium}
			>
				<Card width = '20rem' height = '12rem'>
				<Flex direction="column" alignItems="flex-start"  textAlign="left">
					<Divider/>
					<Heading level={5}>
						Asynchronous communication
					</Heading>
					<Text as="span">
						This software allows you to have asynchronous communication with your contacts, allowing
						for efficient and convenient communication.
					</Text>
				</Flex>
			</Card>
			</View>
			<View
				padding={tokens.space.medium}
				border-top = "1px solid #669999"
			>
				<Card width = '20rem' height = '12rem' border-top = "1px solid black">
				<Flex direction="column" alignItems="flex-start" textAlign="left">
					<Divider/>
					<Heading level={5}>
						Open Source
					</Heading>
						<Text as="span">
							This software is open source and developed using AWS services such as Amplify, Cognito, and Rekognition.
						</Text>
					</Flex>
				</Card>
			</View>
	  	</Flex>
		</motion.div>
	</div>
	);
  };