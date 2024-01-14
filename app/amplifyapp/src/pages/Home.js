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
  import amplifyLogo from '../assets/amplify.svg';
  import cognitoLogo from '../assets/cognito.svg';
  import rekognitionLogo from '../assets/rekognition.svg';
  import {motion, useScroll} from "framer-motion";
  import { useRef } from "react";


  export const Home = () => {
	const { tokens } = useTheme();
	const ref = useRef(null);
	const { scrollXProgress } = useScroll({ container: ref });
	return (
		<div>
			{/*video banner*/}
			<div className = "wrapper">
			<div className = "overlay"></div>
				<video src = {videoBG2} autoPlay loop muted width = "100%"/>
				<div className = "content">
					<h1>blur</h1>
					<h2>Asynchronous, secure, and efficient communication</h2>
				</div>
			</div>
			{/*main three calls - with animation*/}
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
			{/*service logo section*/}
		
			<Flex direction="row" alignItems="center" justifyContent="center">
			<motion.div
				initial = {{opacity: 0}}
				whileInView = {{opacity:1}}
				exit = {{opacity: 0}}
				viewport={{amount: 0.3, once: false}}
			>
			<figure className='figure'>
				<img src={amplifyLogo} width = '100%'/>
				<figcaption>AWS Amplify</figcaption>
			</figure>
			</motion.div>
			<motion.div
				initial = {{opacity: 0}}
				whileInView = {{opacity:1}}
				exit = {{opacity: 0}}
				viewport={{amount: 0.6, once: false}}
			>
			<figure className='figure'>
				<img src={rekognitionLogo} width = '100%'/>
				<figcaption>Rekognition</figcaption>
			</figure>
			</motion.div>
			<motion.div
				initial = {{opacity: 0}}
				whileInView = {{opacity:1}}
				exit = {{opacity: 0}}
				viewport={{amount: 0.8, once: false}}
			>
			<figure className='figure'>
				<img src={cognitoLogo} width = '100%'/>
				<figcaption>AWS Cognito</figcaption>
			</figure>
			</motion.div>
			</Flex>
		</div>
	);
  };